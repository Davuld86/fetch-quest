#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import *

class Home(Resource):
    def get(self):
        games = Game.query.limit(20).all()
        return games.to_dict(), 200

class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            user = User.query.filter(User.id ==session['user_id']).first()
            return user.to_dict(), 200
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
                _password_hash = json['password']
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(),201

class Login(Resource):
    def post(self):
        json = request.get_json()
        print(json)
        user = User.query.filter(User.username == json['username']).first()
        if user == None:
            return {'error': 'Username or Password Incorrect'}, 401
        if user.authenticate(json['password']):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'error': 'Username or Password Incorrect'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return '', 204

class Profile(Resource):
    def get(self, username):
        user = User.query.filter_by(username = username).first()
        return user.to_dict()

    def patch(self):
        data = request.get_json()
        user = User.query.filter(User.id ==session['user_id']).first()

        for attribute in data:
            setattr(user, attribute, data[attribute])
        db.session.add(user)
        db.session.commit()

        return user.to_dict(), 200

    def delete(self):
        user = User.query.filter_by(id = session['user_id']).first()
        db.session.delete(user)
        db.session.commit()
        return '', 204

# Views go here!
api.add_resource(Home, '/')
api.add_resource(Login,'/login', endpoint = 'login')
api.add_resource(SignUp, '/signup', endpoint = 'signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

