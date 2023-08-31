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
        data = request.get_json()

        drink = Drink()
        drink_data = {
            "strDrink": data["strDrink"],
            "strInstructions": data["strInstructions"],
        }
        for i in range(1, 11):
            if data.get(f"strIngredient{i}"):
                drink_data[f"strIngredient{i}"] = data[f"strIngredient{i}"]
                drink_data[f"strMeasure{i}"] = data.get(f"strMeasure{i}", "")

        try:
            for attr, value in drink_data.items():
                setattr(drink, attr, value)
            db.session.add(drink)
            db.session.flush()  # Flush to get the drink id

            # Create and associate ingredients
            ingredient_ids = []
            for i in range(1, 11):
                ingredient_name = data.get(f"strIngredient{i}")
                if ingredient_name:
                    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                    if not ingredient:
                        ingredient = Ingredient(name=ingredient_name)
                        db.session.add(ingredient)
                    ingredient_ids.append(ingredient.id)
            
            for ingredient_id in ingredient_ids:
                drink_ingredient_association = DrinkIngredientsAssociation(drink_id=drink.id, ingredient_id=ingredient_id)
                db.session.add(drink_ingredient_association)

            db.session.commit()
            
            return make_response(drink.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return make_response({ "errors": ["validation errors"] }, 400)

api.add_resource(CreateDrink, '/create_drink')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
