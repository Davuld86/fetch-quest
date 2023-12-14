#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import Message, Inbox

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


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Message.query.delete()
        Inbox.query.delete()

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














