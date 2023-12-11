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






# Views go here!
api.add_resource(CheckSession, '/api/check_station', endpoint= 'check_session')
api.add_resource(SignUp, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

