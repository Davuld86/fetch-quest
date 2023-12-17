#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import Message, Inbox, Friend, Item

msg = [
        {'user_id':1, 'inbox_id':1 , 'content':'hi'},
        {'user_id':2, 'inbox_id':2, 'content':'hey'},
        {'user_id':4, 'inbox_id': 3, 'content':'something'},
        {'user_id':5, 'inbox_id': 4, 'content':'okay'},
        {'user_id':1, 'inbox_id': 2, 'content':'test'},
        {'user_id':1, 'inbox_id': 3, 'content':'messages'},
        {'user_id':3, 'inbox_id': 2, 'content':'something else'}
]

inbox = [
    {'user_id':1 , 'sender_id':2},
    {'user_id':1 , 'sender_id':3},
    {'user_id':1 , 'sender_id':4},
    {'user_id':1 , 'sender_id':5},
]

friends = [
    {'user_id_1': 1, 'user_id_2':2, 'status': 'REQ_1'},
    {'user_id_1': 1, 'user_id_2':3, 'status': 'REQ_2'},
    {'user_id_1': 1, 'user_id_2':2, 'status': 'FRIEND'},
    {'user_id_1': 1, 'user_id_2':4, 'status': 'FRIEND'},
]

items = [
    {'name':'Hp Potion','image':'../images/shop/hp.jpg','price':200, 'category':'battle'},
    {'name':'Mp Potion','image':'../images/shop/mp.jpg','price':200, 'category':'battle'},
    {'name':'Bed','image':'../images/shop/bed.jpg','price':1000, 'category':'furniture'},
    {'name':'Rabbit Plush ','image':'../images/shop/plush_rabbit.jpg','price':650, 'category':'furniture'},
    {'name':'Orange Scarf','image':'../images/shop/orange_scarf.png','price':500, 'category':'clothes'},
    {'name':'Rug','image':'../images/shop/rug.jpg','price':500, 'category':'furniture'},
    {'name':'Christmas Hat','image':'../images/shop/christmas_hat.png','price':400, 'category':'clothes'},
]

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Item.query.delete()
        for item in items:
            new_item = Item(
                name = item['name'],
                image = item['image'],
                price = item['price'],
                category= item['category']
            )
            db.session.add(new_item)
        db.session.commit()


        '''Message.query.delete()
        Inbox.query.delete()

        Friend.query.delete()
        for friend in friends:
            new_friend = Friend(
                user_id_1 = friend['user_id_1'],
                user_id_2 = friend['user_id_2'],
                status= friend['status']
            )
            db.session.add(new_friend)
            print(new_friend)
        db.session.commit()


        db.session.commit()
        for box in inbox:
            new_box = Inbox(
                user_id = box['user_id'],
                sender_id = box['sender_id']
            )
            db.session.add(new_box)
        db.session.commit()
        for message in msg:
            new_message = Message(
                user_id = message['user_id'],
                inbox_id = message['inbox_id'],
                content = message['content']
            )
            db.session.add(new_message)
            db.session.commit()
'''










