from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable= False)
    _password_hash = db.Column(db.String)
    pfp = db.Column(db.String)
    created = db.Column(db.DateTime, default = datetime.utcnow)

    #favorites = db.relationship()
    #posts = db.relationship()

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    # setter method for the password property
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = self.simple_hash(password)

    # authentication method using user and password
    def authenticate(self, password):
        return self.simple_hash(password) == self.password_hash

    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    path = db.Column(db.String)
    playcount = db.Column(db.Integer)
    score = db.Column(db.Integer, default =0)
    release_date = db.Column(db.DateTime, default = datetime.utcnow)
    
    #favorited_by = db.relationship() 
     
class Review(db.Model, SerializerMixin):

    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    created = db.Column(db.DateTime, default = datetime.utcnow)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))