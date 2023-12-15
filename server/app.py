#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from difflib import SequenceMatcher

# Local imports
from config import app, db, api

# Add your model imports
from models import *

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

class SignUp(Resource):
    def post(self):
        json = request.get_json()
        if User.query.filter_by(username = json['username'].lower()).first():
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
                user_id = new_user.id,
            )
            db.session.add(new_character)
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

class AllMessages(Resource):
    def get(self):
        mes = Message.query.all()
        if mes:
            return [message.to_dict() for message in mes],200

class UserMessages(Resource):
    def get(self):
        sent_messages = Message.query.filter(Message.sender_id== session['user_id']).all()
        received_messages = Message.query.filter(Message.receiver_id== session['user_id']).all()
        messages =  sent_messages + received_messages
        if messages:
            return [message.to_dict() for message in messages],200
        else:
            return {'error':'No messages found'},404

class DirectMessage(Resource):
    def post(self):
        json = request.get_json()
        message = Message(
                user_id = json['user_id'],
                inbox_id = json['inbox_id'],
                content = json['content']
            )
        db.session.add(message)
        db.session.commit()

        return message.to_dict()

class DeleteMessage(Resource):
    def delete(self,message_id):
        message = Message.query.filter(Message.id == message_id).first()
        db.session.delete(message)
        db.session.commit()
        return '',201

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
        pass
    #accepting friend rq
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

class AllCharacters(Resource):
    def get(self):
        char = Character.query.all()
        if char:
            return [cha.to_dict() for cha in char],200
# Views go here!
api.add_resource(CheckSession, '/api/check_session', endpoint= 'check_session')
api.add_resource(SignUp, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(UserID, '/api/user/<int:user_id>')
api.add_resource(AllMessages, '/api/messages')
api.add_resource(UserMessages, '/api/user_messages')
api.add_resource(DirectMessage, '/api/send_message')
api.add_resource(DeleteMessage, '/api/delete_message/<int:message_id>')
api.add_resource(AllFriends, '/api/all_friends')
api.add_resource(Friendship, '/api/friends/<int:user_id>')
api.add_resource(AllCharacters, '/api/all_characters')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

