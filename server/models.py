from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from sqlalchemy import UniqueConstraint, CheckConstraint
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db, bcrypt
from battle_helpers import *
from enum import Enum

# Models go here!
messages_association = db.Table('messages_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('message_id', db.Integer, db.ForeignKey('messages.id'), primary_key=True)
)

equipment_association = db.Table('equipment_association',
    db.Column('character_id', db.Integer, db.ForeignKey('characters.id')),
    db.Column('equipment_id', db.Integer, db.ForeignKey('equipment.id'))
                                 )

items_association = db.Table('items_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('item_id', db.Integer, db.ForeignKey('items.id'))
                             )

drops_association = db.Table('drops_association',
    db.Column('enemy_id', db.Integer, db.ForeignKey('enemies.id')),
    db.Column('item_id', db.Integer, db.ForeignKey('items.id')),
                             )
# Equipment association
# Items association
# Drops association

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-chats.user','-sent_friend.sent_user', '-base.user_base' )

    serialize_only = ('id', 'username', 'pfp', 'bio', 'coins',
                    'created', 'character', 'base', 'chats', 'inventory'
                    )

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable= False)
    pfp = db.Column(db.String, default ='../images/def_pfp.png')
    bio = db.Column(db.String, default = '')
    coins = db.Column(db.Integer, default= 2500)
    created = db.Column(db.DateTime, default = datetime.utcnow)

    inventory = db.relationship('Item', secondary=items_association)
    character = db.relationship('Character')
    base = db.relationship('Base', backref='user_base')
    _password_hash = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
         return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
       return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class FriendEnum(Enum):
    REQ_1 = 'sent to 1'
    REQ_2 = 'sent to 2'
    FRIEND = 'Friends'

class Friend(db.Model, SerializerMixin):
    __tablename__ ='friends'
    serialize_only = ('id', 'user_id_1', 'user_id_2', 'status','user_1.username','user_1.pfp','user_2.username','user_2.pfp')
    id = db.Column(db.Integer, primary_key=True)
    user_id_1 = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_2 = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.Enum(FriendEnum))
    user_1 = db.relationship('User', foreign_keys=[user_id_1])
    user_2 = db.relationship('User', foreign_keys=[user_id_2])

class Inbox(db.Model, SerializerMixin):
    __tablename__ = 'inboxes'

    serialize_only=('id', 'messages','user.id', 'sender.id', 'user.pfp','sender.pfp','user.username','sender.username' )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    messages = db.relationship('Message', backref= 'inbox')
    user = db.relationship('User', foreign_keys=[user_id], backref='chats')
    sender = db.relationship('User', foreign_keys =[sender_id], backref='received')

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    serialize_only=('id', 'content', 'timestamp','sender.pfp','sender.username')

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    inbox_id = db.Column(db.Integer, db.ForeignKey('inboxes.id'))

    sender = db.relationship('User', backref= 'messages')

class Character(db.Model, SerializerMixin):

    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
    job = db.Column(db.String, default='swordsman')
    color = db.Column(db.String)
    hp = db.Column(db.Integer, default =100)
    mp = db.Column(db.Integer, default =100)
    atk = db.Column(db.Integer, default =20)
    matk = db.Column(db.Integer, default =20)
    defense = db.Column(db.Integer, default =20)
    level = db.Column(db.Integer, default=1)
    exp = db.Column(db.Integer, default=0)
    position = db.Column(db.String, default='{"area":0,"x": 0, "y": 0}')
    equipment = db.relationship('Equipment', backref='character')

class Equipment(db.Model, SerializerMixin):
    __tablename__ = 'equipment'

    id = db.Column(db.Integer, primary_key=True)
    character_id  = db.Column(db.Integer, db.ForeignKey('characters.id'))
    type = db.Column(db.String) #hat, top, bottom, weapon
    stat = db.Column(db.String)
    boost = db.Column(db.Integer)
    image = db.Column(db.String)
    enemy_id = db.Column(db.String, nullable=True)

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer, default =200)
    category = db.Column(db.String)
    image = db.Column(db.String)
    furn_type = db.Column(db.String, default=None)
    position = db.Column(db.String, default=None)
    enemy_id = db.Column(db.String, nullable=True)

class Enemy(db.Model, SerializerMixin):
    __tablename__ = 'enemies'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(20), nullable=False)
    exp = db.Column(db.Integer, default=100)
    hp = db.Column(db.Integer, default =100)
    atk = db.Column(db.Integer, default =10)
    matk = db.Column(db.Integer, default =10)
    defense = db.Column(db.Integer, default =10)
    coins = db.Column(db.Integer, default=50)
    image = db.Column(db.String)
    item_drops = db.relationship('Item', secondary= drops_association)

class Base(db.Model, SerializerMixin):
    __tablename__ = 'bases'

    serialize_only = ('id', 'user_id', 'user_base.username', 'wall', 'rug', 'furniture_1', 'furniture_2', 'furniture_3')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    wall_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    rug_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    furniture_1_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    furniture_2_id = db.Column(db.Integer, db.ForeignKey('items.id'))
    furniture_3_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    wall = db.relationship('Item', foreign_keys=[wall_id])
    rug = db.relationship('Item', foreign_keys=[rug_id])
    furniture_1 = db.relationship('Item', foreign_keys=[furniture_1_id])
    furniture_2 = db.relationship('Item', foreign_keys=[furniture_2_id])
    furniture_3 = db.relationship('Item', foreign_keys=[furniture_3_id])




class Move(db.Model, SerializerMixin):
    __tablename__ = 'moves'

    serialize_rules =('-id', '-job')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    job = db.Column(db.String)
    type = db.Column(db.String)
    accuracy = db.Column(db.Integer)
    base = db.Column(db.Integer)
    cost = db.Column(db.Integer)



