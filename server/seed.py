#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import app, db
from models import *



items = [
    {'name':'Hp Potion','image':'../images/shop/hp.png','price':200, 'category':'battle', 'furn_type': None},
    {'name':'Mp Potion','image':'../images/shop/mp.png','price':200, 'category':'battle', 'furn_type': None},

    {'name':'Bed','image':'../images/shop/bed.png','price':1000, 'category':'furniture', 'furn_type': 'furniture'},
    {'name':'Rabbit Plush','image':'../images/shop/plush_rabbit.png','price':650, 'category':'furniture','furn_type': 'furniture'},
    {'name':'Pool','image':'../images/shop/pool.png','price':1050, 'category':'furniture','furn_type': 'furniture'},
    {'name':'Arcade Cabinet','image':'../images/shop/arcade.png','price':1400, 'category':'furniture','furn_type': 'furniture'},

    {'name':'Cool Poster','image':'../images/shop/cool_poster.png','price':850, 'category':'furniture','furn_type':'wall'},
    {'name':'Royal Painting','image':'../images/shop/royal_poster.png','price':850, 'category':'furniture','furn_type':'wall'},
    {'name':'Leaf Wall Clock','image':'../images/shop/leaf_clock.png','price':500, 'category':'furniture','furn_type':'wall'},

    {'name':'Red Rug','image':'../images/shop/rug.png','price':500, 'category':'furniture', 'furn_type': 'floor'},

    {'name':'Orange Scarf','image':'../images/shop/orange_scarf.png','price':500, 'category':'clothes','furn_type': None},
    {'name':'Christmas Hat','image':'../images/shop/christmas_hat.png','price':400, 'category':'clothes', 'furn_type': None},
]

enemies = [
    {'name':'Giant Rat', 'hp':100,'atk':10,'defense':10,'matk':10,'coins':50,'item_drops':[1], 'image':'../images/enemies/rat.png', 'exp':25},
    {'name':'Leaf Monster', 'hp':150,'atk':15,'defense':10,'matk':15,'coins':100,'item_drops':[2], 'image':'../images/enemies/leaf_monster.png', 'exp':40},
    {'name':'Slime', 'hp':400,'atk':10,'defense':5,'matk':20 ,'coins':200,'item_drops':[4], 'image':'../images/enemies/slime.png', 'exp':75},
    {'name':'Skeleton', 'hp':250,'atk':30,'defense':10,'matk':5,'coins':250,'item_drops':[1], 'image':'../images/enemies/skeleton.png', 'exp':140},
    {'name':'Brohg', 'hp':350,'atk':40,'defense':10,'matk':5,'coins':250,'item_drops':[1], 'image':'../images/enemies/brohg.png', 'exp':300},
    {'name':'Spirit', 'hp':500,'atk':45,'defense':30,'matk':45,'coins':500,'item_drops':[7], 'image':'../images/enemies/spirit.png', 'exp':450},
    {'name':'Gargoyle', 'hp':800,'atk':50,'defense':40,'matk':25,'coins':700,'item_drops':[7], 'image':'../images/enemies/gargoyle.png', 'exp':650},
    {'name':'Wood Golem', 'hp':1000,'atk':60,'defense':50,'matk':0,'coins':1000,'item_drops':[3], 'image':'../images/enemies/wood_golem.png', 'exp':800},
    {'name':'Royal Dragon', 'hp':3000,'atk':80,'defense':60,'matk':0,'coins':4000,'item_drops':[3], 'image':'../images/enemies/royal_dragon.png', 'exp':1500},
]

moves = [
    {'name':'Slash', 'job':'swordsman', 'type':'physical','accuracy':80, 'base':30, 'cost':-10},
    {'name':'Forceful Blow', 'job':'swordsman', 'type':'physical','accuracy':90, 'base':40, 'cost':20},
    {'name':'Cresent Edge', 'job':'swordsman', 'type':'physical','accuracy':85, 'base':75, 'cost':30},
    {'name':'Omni-Slash', 'job':'swordsman', 'type':'physical','accuracy':100, 'base':120, 'cost':60},

    {'name':'Shoot', 'job':'archer', 'type':'physical','accuracy':100, 'base':20, 'cost':0},
    {'name':'Double Shot', 'job':'archer', 'type':'physical','accuracy':100, 'base':20, 'cost':20},
    {'name':'Wind Cutter', 'job':'archer', 'type':'magic','accuracy':100, 'base':40, 'cost':30},
    {'name':'Cyclone', 'job':'archer', 'type':'magic','accuracy':95, 'base':80, 'cost':50},

    {'name':'Stab', 'job':'thief', 'type':'physical','accuracy':80, 'base':20, 'cost':0},
    {'name':'Backstab', 'job':'thief', 'type':'physical','accuracy':95, 'base':40, 'cost':8},
    {'name':'Throat Chop', 'job':'thief', 'type':'physical','accuracy':50, 'base':120, 'cost':16},
    {'name':'Shadow Strike', 'job':'thief', 'type':'magic','accuracy':90, 'base':80, 'cost':32},

    {'name':'Lucky Star', 'job':'wizard', 'type':'magic','accuracy':90, 'base':40, 'cost':10},
    {'name':'Fireball', 'job':'wizard', 'type':'magic','accuracy':90, 'base':70, 'cost':40},
    {'name':'Ice Shard', 'job':'wizard', 'type':'magic','accuracy':90, 'base':80, 'cost':40},
    {'name':'Thunder', 'job':'wizard', 'type':'magic','accuracy':90, 'base':140, 'cost':60},
]

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        Inbox.query.delete()
        Message.query.delete()
        db.session.query(GameServer).delete()
        db.session.query(User).delete()
        db.session.query(Character).delete()
        db.session.query(Base).delete()
        db.session.query(Item).delete()
        db.session.commit()

        for item in items:
            new_item = Item(
                name = item['name'],
                image = item['image'],
                price = item['price'],
                category= item['category'],
                furn_type = item['furn_type'],
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




        Enemy.query.delete()
        for enemy in enemies:
            print(enemy['name'])
            new_enemy = Enemy(
                name = enemy['name'],
                hp = enemy['hp'],
                max_hp = enemy['hp'],
                atk = enemy['atk'],
                defense = enemy['defense'],
                matk = enemy['matk'],
                coins = enemy['coins'],
                exp = enemy['exp'],
                image = enemy['image'],
            )
            db.session.add(new_enemy)
        db.session.commit()

        Move.query.delete()
        for move in moves:
            print(move['name'])
            new_move = Move(
                name = move['name'],
                job = move['job'],
                type = move['type'],
                accuracy = move['accuracy'],
                base = move['base'],
                cost = move['cost']
            )
            db.session.add(new_move)
        db.session.commit()
'''










