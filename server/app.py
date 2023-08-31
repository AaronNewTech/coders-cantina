#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate
# Add your model imports
from models import db, Drink, Ingredient, User, DrinkIngredientsAssociation
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

class Drinks(Resource):
    def get(self):
        drinks = [drink.to_dict() for drink in Drink.query.all()]
        return make_response(drinks, 200)
    
api.add_resource(Drinks, '/drinks')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
api.add_resource(Users, '/users')

class CreateUser(Resource):
    def post(self):
        user = User()
        data = request.get_json()

        try:
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)
        except ValueError:
            return make_response({ "errors": ["validation errors"] }, 400)
        
api.add_resource(CreateUser, '/create_user')

class CreateDrink(Resource):
    def post(self):
        drink = Drink()
        data = request.get_json()

        try:
            for attr in data:
                setattr(drink, attr, data[attr])
            db.session.add(drink)
            db.session.commit()
            return make_response(drink.to_dict(), 201)
        except ValueError:
            return make_response({ "errors": ["validation errors"] }, 400)

api.add_resource(CreateDrink, '/create_drink')

class CreateDrinkIngredients(Resource):
    def post(self):
        data = request.get_json()

        # Extract data from the JSON request
        drink_id = data.get("drinkId")
        ingredient_ids = data.get("ingredientIds")

        # Fetch the drink and ingredient objects
        drink = Drink.query.get(drink_id)
        ingredients = Ingredient.query.filter(Ingredient.id.in_(ingredient_ids)).all()

        # Create associations between the drink and ingredients
        for ingredient in ingredients:
            association = DrinkIngredientsAssociation(drink=drink, ingredient=ingredient)
            db.session.add(association)

        # Commit the changes to the database
        db.session.commit()

        return make_response({"message": "Drink ingredients associations created successfully"}, 201)

api.add_resource(CreateDrinkIngredients, '/create_drink_ingredients')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
