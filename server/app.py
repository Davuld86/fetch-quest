#!/usr/bin/env python3

# Standard library imports
import asyncio

# Remote library imports
from flask import request, session, abort, make_response, jsonify
from flask_restful import Resource
from difflib import SequenceMatcher
from flask_socketio import emit

# Local imports
from config import app, db, api, socketio

# Add your model imports
from models import *
#auto login
class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id ==session['user_id']).first()
            if user:
                return user.to_dict(), 200
            else:
                return {'error':'No user found'}, 404
        else:
            return {'error': 'Not logged in'}, 401
#user stuff
class SignUp(Resource):
    def post(self):
        json = request.get_json()
        if User.query.filter(func.lower(User.username) == json['username'].lower()).first():
            return ({'error': 'Username already taken.'}, 401)
        else:
            new_user = User(
                username = json['username'].strip(),
                password_hash = json['password'].strip()
            )
            db.session.add(new_user)
            db.session.commit()
            new_character = Character(
                color = json['color'],
                job = json['job'],
                hp = json['hp'],
                max_hp = json['max_hp'],
                max_mp = json['max_mp'],
                mp = json['mp'],
                atk=  json['atk'],
                matk = json['matk'],
                defense = json['defense'],
                user_id = new_user.id,
            )
            db.session.add(new_character)
            new_house = Base(user_id = new_user.id)
            db.session.add(new_house)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(),201

class Login(Resource):
    def post(self):
        json = request.get_json()
        user = User.query.filter(User.username == json['username']).first()
        if user == None:
            return {'error': 'Username or Password Incorrect'}, 401
        if user.authenticate(json['password']):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': 'Username or Password Incorrect'}, 401

class Logout(Resource):
    def delete(self):
            if session.get('user_id') ==None:
                session['user_id'] = None
                return {'error': 'Login first silly'},401
            session['user_id']= None
            return '', 204

class UserID(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id = user_id).first()
        if user:
            return user.to_dict(), 200
        return {'error': 'No user found'}, 404

    def patch(self,user_id):
        data = request.get_json()
        print(data)
        user = User.query.filter(User.id == user_id).first()
        for attribute in data:
            setattr(user, attribute, data[attribute])
        db.session.add(user)
        db.session.commit()

        return user.to_dict(), 200

    def delete(self, user_id):
        user = User.query.filter_by(id = user_id).first()
        db.session.delete(user)
        db.session.commit()
        return '', 204

class UserHouse(Resource):
    def get(self, user_id):
        house  = Base.query.filter(Base.user_id == user_id).first()
        if house:
            return house.to_dict(),200
        return {'error':'No Treehouse found'}

    def patch(self, user_id):
        data = request.get_json()
        house = Base.query.filter(Base.user_id == user_id).first()
        for attribute in data:
            setattr(house, attribute, data[attribute])
        db.session.add(house)
        db.session.commit()
        return house.to_dict(),200

#character stuff
class CharacterID(Resource):
    def get(self, char_id):
        character = Character.query.filter(Character.id==char_id).first()
        if character:
            return character.to_dict(),200
        return {'error', 'Character not found!'}, 404

    def patch(self, char_id):
        data = request.get_json()
        character = Character.query.filter(Character.id==char_id).first()
        if character:
            for attribute in data:
                setattr(character, attribute, data[attribute])
            db.session.add(character)
            db.session.commit()
            return character.to_dict(),200
        else:
            return {'error', 'Character not found!'}, 404

class AllCharacters(Resource):
    def get(self):
        char = Character.query.all()
        if char:
            return [cha.to_dict() for cha in char],200

#messages
class AllMessages(Resource):
    def get(self):
        mes = Message.query.all()
        if mes:
            return [message.to_dict() for message in mes],200

class UserMessages(Resource):
    def get(self):
        sent_messages = Message.query.filter(Message.sender.id== session['user_id']).all()
        received_messages = Message.query.filter(Message.receiver_id== session['user_id']).all()
        messages =  sent_messages + received_messages
        if messages:
            return [message.to_dict() for message in messages],200
        else:
            return {'error':'No messages found'},404

class InboxID(Resource):
    def post(self, user_id, owner_id):
        user = User.query.filter(User.id == user_id).first()
        inbox = Inbox(
            user_id = user_id,
            owner_id = owner_id
        )
        db.session.add(inbox)
        user.chats.append(inbox)
        db.session.add(user)
        db.session.commit()
        return inbox.to_dict(), 200

    def delete(self,user_id, owner_id):
        inbox = Inbox.query.filter(Inbox.user_id== user_id and Inbox.owner_id==owner_id).first()
        db.session.delete(inbox)
        db.session.commit()
        return '', 201

class InboxMessages(Resource):
    def get(self, box_id):
        inbox = Inbox.query.filter(Inbox.id== box_id).first()
        if inbox:
            return inbox.to_dict(),200
        return {'error':'inbox does not exist'},404

class DirectMessage(Resource):
    def post(self):
        json = request.get_json()
        message = Message(
                sent_to = json['sent_to'],
                sent_from = json['sent_from'],
                content = json['content'],
            )
        sender = User.query.filter(User.id==json['sent_from']).first()
        user = User.query.filter(User.id == json['sent_to']).first()

        sender_inbox = Inbox.query.filter(Inbox.user_id== json['sent_from'] and Inbox.owner_id==json['sent_to']).first()
        inbox = Inbox.query.filter(Inbox.user_id== json['sent_to'] and Inbox.owner_id==json['sent_from']).first()

        sender.chats.remove(sender_inbox)
        sender.chats.insert(0,sender_inbox)
        if inbox in user.chats:
            user.chats.remove(inbox)
            user.chats.insert(0,inbox)
        else:
            new_box = Inbox(
            user_id = json['sent_to'],
            owner_id = json['sent_from']
                )
            db.session.add(new_box)
        db.session.add(message)
        db.session.commit()
        return message.to_dict(),200

class DeleteMessage(Resource):
    def delete(self,message_id):
        message = Message.query.filter(Message.id == message_id).first()
        db.session.delete(message)
        db.session.commit()
        return '',201

#friends
class AllFriends(Resource):
    def get(self):
        f = Friend.query.all()
        return [fr.to_dict() for fr in f], 200

class Friendship(Resource):
    def get(self, user_id):
        check_1 = Friend.query.filter(Friend.user_id_1 == user_id).all()
        check_2 = Friend.query.filter(Friend.user_id_2 == user_id).all()
        friends = check_1 +check_2
        if friends:
            return [friend.to_dict() for friend in friends],200
        else:
            return {'error':'This user does not have any friends'}, 404
    #send friend rq
    def post(self, user_id):
        #check if uid1 > user_id2 post
        data = request.get_json()
        if int(data['request']) > int(data['friend']):
            new_friend = Friend(
                status= 'REQ_1',
                user_id_1 = data['friend'],
                user_id_2 = data['request'],
            )
            db.session.add(new_friend)
        elif int(data['request']) < int(data['friend']):
            new_friend = Friend(
                status = 'REQ_2',
                user_id_1 = data['request'],
                user_id_2 = data['friend'],
            )
            db.session.add(new_friend)
        db.session.commit()
        return new_friend.to_dict(),200
    #accepting friend rq
    # PATCH AND DELETE actually uses friend id instead of uid, kept becasue ¯\_(ツ)_/¯
    def patch(self, user_id):
        json = request.get_json()
        friend = Friend.query.filter(Friend.id== user_id).first()
        for attribute in json:
            setattr(friend, attribute, json[attribute])
        db.session.add(friend)
        db.session.commit()
        return friend.to_dict(), 200

    #reject/remove from friends
    def delete(self, user_id):
        friend = Friend.query.filter(Friend.id== user_id).first()
        db.session.delete(friend)
        db.session.commit()
        return '',201

#items
class AllItems(Resource):
    def get(self):
        items = Item.query.all()
        return [item.to_dict() for item in items],200

class ItemID(Resource):
    def get(self, item_id):
        item = Item.query.filter(Item.id == item_id).first()
        if item:
            return item.to_dict(), 200
        return {'error':'item not found'}

    def post(self, item_id):
        data = request.get_json()
        item = Item.query.filter(Item.id == item_id).first()
        user = User.query.filter(User.id==data['user_id']).first()
        new_item = Item(
            name = item.name,
            image = item.image,
            price = item.price,
            category= item.category,
            furn_type = item.furn_type,
        )
        user.coins = user.coins - data['price']
        user.inventory.append(new_item)
        db.session.commit()
        return user.to_dict(), 200

    def delete(self, item_id):
        item = Item.query.filter(Item.id == item_id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
            return '',201
        return {'error':'no item found'}

#enemies
class AllEnemies(Resource):
    def get(self):
        enemies = Enemy.query.all()
        return [enemy.to_dict() for enemy in enemies], 200

class EnemyId(Resource):
    def get(self, enemy_id):
        foe = Enemy.query.filter(Enemy.id == enemy_id).first()
        if foe:
            return foe.to_dict(), 200
        return {'error':'enemy not found'}, 404

class EnemyName(Resource):
    def get(self,name):
        enemy = Enemy.query.filter(func.lower(Enemy.name) ==name.lower().replace('%20+', '')).first()
        if enemy:
            return enemy.to_dict(), 200
        return {'error': 'no enemy with that name found'}, 404

#moves
class JobMoves(Resource):
    def get(self,job):
        moves = Move.query.filter(Move.job == job).all()
        if moves:
            return [move.to_dict() for move in moves], 200
        return {'error':'moves not found'}

class Server(Resource):
    def get(self):
        users = GameServer.query.all()
        if users:
            return [user.to_dict() for user in users], 200
        return {'error': 'no users in server'}, 401

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(f'requestID: {request.sid} has connected')
    emit("connected",{"data":f"id: {request.sid} is connected"})

@socketio.on('disconnect')
def disconnected():
    try:
        print(f'requestID: {request.sid} has left')
        user = GameServer.query.filter(GameServer.request_id == request.sid).first()
        db.session.delete(user)
        db.session.commit()
        emit('disconnected',{'data':f'id{request.sid} is disconnected'})
    except:
        print('૮₍˃ ⤙˂ ₎ა')
        abort('write error',500)


@socketio.on('message')
def handle_message(data):
    message = Message(
                sent_to = data['sent_to'],
                sent_from = data['sent_from'],
                content = data['content'],
            )
    sender = User.query.filter(User.id==data['sent_from']).first()
    user = User.query.filter(User.id == data['sent_to']).first()

    sender_inbox = Inbox.query.filter(Inbox.user_id== data['sent_from'] and Inbox.owner_id==data['sent_to']).first()
    inbox = Inbox.query.filter(Inbox.user_id== data['sent_to'] and Inbox.owner_id==data['sent_from']).first()

    sender.chats.remove(sender_inbox)
    sender.chats.insert(0,sender_inbox)
    if inbox in user.chats:
        user.chats.remove(inbox)
        user.chats.insert(0,inbox)
    else:
        new_box = Inbox(
        user_id = data['sent_to'],
        owner_id = data['sent_from']
                )
        db.session.add(new_box)
    db.session.add(message)
    db.session.commit()
    emit("message",message.to_dict(),broadcast=True)


@socketio.on('delete_message')
def handle_delete(data):
    message = Message.query.filter(Message.id == data['id']).first()
    db.session.delete(message)
    db.session.commit()
    emit("delete_message",data,broadcast=True)

@socketio.on("move")
def handle_move(data):
    user = GameServer.query.filter(GameServer.user_id==data['user_id']).first()
    character = Character.query.filter(Character.user_id==data['user_id']).first()
    for attribute in data:
        setattr(character,attribute,data[attribute])
    db.session.add(character)
    db.session.commit()
    emit("moved",user.to_dict(),broadcast=True)

@socketio.on('join_server')
def join_server(data):
    check_user = GameServer.query.filter(GameServer.user_id==data['user_id']).first()
    if not check_user:
        serv = GameServer(
            user_id = data['user_id'],
            request_id =request.sid,
        )
        db.session.add(serv)
        db.session.commit()
        emit('join_server',serv.to_dict(), broadcast=True)

@socketio.on('leave_server')
def leave_server(data):
    print(data)
    user = GameServer.query.filter(GameServer.user_id == data['user_id']).first()
    db.session.delete(user)
    db.session.commit()
    emit('left_server',{'id':data['user_id']}, broadcast=True)

@socketio.on("all_chat")
def handle_all_chat(data):
    emit("all_chat",{'data':data,'id':request.sid},broadcast=True)

@socketio.on('exit_battle')
def handle_exit_battle(data):
    user = GameServer.query.filter(GameServer.user_id==data['user_id']).first()
    character = Character.query.filter(Character.user_id==data['user_id']).first()
    for attribute in data:
        if attribute=='coins':
            setattr(user,attribute,data['coins'])
        else:
            setattr(character,attribute,data[attribute])

    db.session.add(character)
    db.session.add(user)
    db.session.commit()
    emit('battle_exit',user.to_dict(),broadcast=True)

@socketio.on_error()
def handle_error(e):
    print('An error occurred:', e)

# Views
api.add_resource(CheckSession, '/api/check_session', endpoint= 'check_session')
api.add_resource(SignUp, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(UserID, '/api/user/<int:user_id>')
api.add_resource(UserHouse,'/api/treehouse/<int:user_id>')

api.add_resource(AllMessages, '/api/messages')
api.add_resource(UserMessages, '/api/user_messages')
api.add_resource(DirectMessage, '/api/send_message')
api.add_resource(DeleteMessage, '/api/delete_message/<int:message_id>')

api.add_resource(InboxID,'/api/inbox/<int:user_id>/<int:owner_id>')
api.add_resource(InboxMessages,'/api/inbox_messages/<int:box_id>')

api.add_resource(AllFriends, '/api/all_friends')
api.add_resource(Friendship, '/api/friends/<int:user_id>')

api.add_resource(AllCharacters, '/api/all_characters')
api.add_resource(CharacterID, '/api/character/<int:char_id>')


api.add_resource(AllItems, '/api/all_items')
api.add_resource(ItemID, '/api/item/<int:item_id>')

api.add_resource(AllEnemies, '/api/all_enemies')
api.add_resource(EnemyId, '/api/enemy/<int:enemy_id>')
api.add_resource(EnemyName, '/api/enemy/<string:name>')

api.add_resource(JobMoves, '/api/moves/<string:job>')
api.add_resource(Server, '/api/server_status')



if __name__ == '__main__':
    socketio.run(app,port=5555, debug=True)

