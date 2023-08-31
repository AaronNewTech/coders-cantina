#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate
# Add your model imports
from models import db, Drink, Ingredient, User
import os
# Local imports
from config import app, db, api


@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


class DrinksById(Resource):
    def get(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        if not drink:
            return make_response({
                "error": "Drink not found"
            }, 404)
        return make_response(drink.to_dict(), 200)


api.add_resource(DrinksById, '/drinks/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
