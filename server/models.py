from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db, bcrypt

# Models go here!

friends_association = db.Table('friends_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('friends.id'), primary_key=True)
)

messages_association = db.Table('messages_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('message_id', db.Integer, db.ForeignKey('messages.id'), primary_key=True)
)

equipment_association = db.Table('equipment_association',
    db.Column('character_id', db.Integer, db.ForeignKey('characters.id')),
    db.Column('equipment_id', db.Integer, db.ForeignKey('equipment.id'))
                                 )

items_association = db.Table('items_association',
    db.Column('character_id', db.Integer, db.ForeignKey('characters.id')),
    db.Column('item_id', db.Integer, db.ForeignKey('items.id'))
                             )

drops_association = db.Table('drops_association',
    db.Column('enemy_id', db.Integer, db.ForeignKey('enemies.id')),
    db.Column('equipment_id', db.Integer, db.ForeignKey('equipment.id')),
    db.Column('item_id', db.Integer, db.ForeignKey('items.id')),

                             )
# Friends association
# Equipment association
# Items association
# Drops association

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable= False)
    pfp = db.Column(db.String, default ='../images/def_pfp.png')
    bio = db.Column(db.String)
    coins = db.Column(db.Integer)
    created = db.Column(db.DateTime, default = datetime.now)

    messages = db.relationship('Message', back_populates='user_messages', secondary= messages_association)
    friends = db.relationship('User', backref='user_friends', secondary= friends_association)
    character = db.relationship('Character', backref='user')
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

class Friend(db.Model, SerializerMixin):
    __tablename__ ='friends'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String(20), nullable=False, default='pending')

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now, nullable=False)

    user_messages = db.relationship('User', secondary=messages_association, back_populates ='messages')

class Character(db.Model, SerializerMixin):

    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(20), nullable=False)
    hp = db.Column(db.Integer, default =100)
    mp = db.Column(db.Integer, default =100)
    atk = db.Column(db.Integer, default =20)
    matk = db.Column(db.Integer, default =20)
    defense = db.Column(db.Integer, default =20)
    level = db.Column(db.Integer, default=1)
    exp = db.Column(db.Integer, default=0)
    job = db.Column(db.String)
    color = db.Column(db.String)
    position = db.Column(db.String, default='{"area":0,"x": 0, "y": 0}')

    equipment = db.relationship('Equipment', backref='character')
    inventory = db.relationship('Item', backref='character')


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
    character_id  = db.Column(db.Integer, db.ForeignKey('characters.id'))
    name = db.Column(db.String)
    action = db.Column(db.String)
    image = db.Column(db.String)
    enemy_id = db.Column(db.String, nullable=True)

class Enemy(db.Model, SerializerMixin):
    __tablename__ = 'enemies'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(20), nullable=False)
    hp = db.Column(db.Integer, default =100)
    mp = db.Column(db.Integer, default =100)
    atk = db.Column(db.Integer, default =20)
    matk = db.Column(db.Integer, default =20)
    defense = db.Column(db.Integer, default =20)
    level = db.Column(db.Integer, default=1)
    coins = db.Column(db.Integer, default=20)

    item_drops = db.relationship('Item', backref='dropped_by', secondary= drops_association)
    equip_drops = db.relationship('Equipment', backref='dropped_by', secondary= drops_association)

class Base(db.Model, SerializerMixin):
    __tablename__ = 'bases'

    id = db.Column(db.Integer, primary_key=True)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
    background = db.Column(db.String)
    rug = db.Column(db.String)
    banner = db.Column(db.String)
    chair = db.Column(db.String)
