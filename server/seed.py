#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import Message, Inbox, Friend, Item, Enemy

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
    {'name':'Hp Potion','image':'../images/shop/hp.png','price':200, 'category':'battle'},
    {'name':'Mp Potion','image':'../images/shop/mp.png','price':200, 'category':'battle'},
    {'name':'Bed','image':'../images/shop/bed.jpg','price':1000, 'category':'furniture'},
    {'name':'Rabbit Plush ','image':'../images/shop/plush_rabbit.jpg','price':650, 'category':'furniture'},
    {'name':'Orange Scarf','image':'../images/shop/orange_scarf.png','price':500, 'category':'clothes'},
    {'name':'Rug','image':'../images/shop/rug.jpg','price':500, 'category':'furniture'},
    {'name':'Christmas Hat','image':'../images/shop/christmas_hat.png','price':400, 'category':'clothes'},
]

enemies = [
    {'name':'Rat', 'hp':100,'atk':10,'defense':10,'matk':10,'coins':50,'item_drops':[1], 'image':'../images/enemies/rat.png', 'exp':25},
    {'name':'Leaf Monster', 'hp':150,'atk':15,'defense':10,'matk':15,'coins':100,'item_drops':[2], 'image':'../images/enemies/leaf_monster.png', 'exp':40},
    {'name':'Slime', 'hp':400,'atk':10,'defense':5,'matk':20 ,'coins':200,'item_drops':[4], 'image':'../images/enemies/slime.png', 'exp':75},
    {'name':'Skeleton', 'hp':250,'atk':30,'defense':10,'matk':5,'coins':250,'item_drops':[1], 'image':'../images/enemies/skeleton.png', 'exp':140},
    {'name':'Spirit', 'hp':500,'atk':25,'defense':30,'matk':45,'coins':500,'item_drops':[7], 'image':'../images/enemies/spirit.png', 'exp':450},
    {'name':'Wood Golem', 'hp':1000,'atk':60,'defense':40,'matk':0,'coins':1000,'item_drops':[3], 'image':'../images/enemies/wood_golem.png', 'exp':800},
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

        Enemy.query.delete()
        for enemy in enemies:
            new_enemy = Enemy(
                name = enemy['name'],
                hp = enemy['hp'],
                atk = enemy['atk'],
                defense = enemy['defense'],
                matk = enemy['matk'],
                coins = enemy['coins'],
                exp = enemy['exp'],
                image = enemy['image'],
            )
            db.session.add(new_enemy)
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










