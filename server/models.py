from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable= False)
    pfp = db.Column(db.String)
    created = db.Column(db.DateTime, default = datetime.utcnow)
    bio = db.Column(db.String)
    reviews = db.relationship('Review', backref = 'user_reviews')
    favorites = db.relationship('Favorite', backref = 'user_favorites')
    posts = db.relationship('Game', backref='created_by')
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
         return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        print(self._password_hash)

    def authenticate(self, password):

       return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    thumbnail = db.Column(db.String)
    category = db.Column(db.String)
    path = db.Column(db.String)
    playcount = db.Column(db.Integer)
    score = db.Column(db.Integer, default =0)
    release_date = db.Column(db.DateTime, default = datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    favorited_by = db.relationship('Favorite', backref='game_favorites')

class Review(db.Model, SerializerMixin):

    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    created = db.Column(db.DateTime, default = datetime.utcnow)
    user_id  = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

