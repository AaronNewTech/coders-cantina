#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, jsonify, session
from flask_restful import Resource, Api
from flask_migrate import Migrate
# Add your model imports
from models import db, Drink, Ingredient, User, DrinkIngredientsAssociation, UserDrinksAssociation
import os
# Local imports
from config import app, db, api

app.secret_key = "your_secret_key"

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
    
    def delete(self, id):
        drink = Drink.query.filter(Drink.id==id).one_or_none()
        if drink is None:
            return make_response({'error': 'Drink is not found'}, 404)
        db.session.delete(drink)
        db.session.commit()
        return make_response({''}, 204)

    def patch(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        if not drink:
            return make_response({"error": "Drink not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(drink, attr, data[attr])
            
            db.session.add(drink)
            db.session.commit()

            return make_response(drink.to_dict(), 202)
        
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        drink = Drink.query.filter(Drink.id==id).one_or_none()
        if drink is None:
            return make_response({'error': 'Drink is not found'}, 404)
        db.session.delete(drink)
        db.session.commit()
        return make_response({}, 204)

    def patch(self, id):
        drink = Drink.query.filter(Drink.id == id).one_or_none()

        if drink is None:
            return {'error': 'Drink not found'}, 404

        fields = request.get_json()

        try:
            setattr(drink, 'strDrink', fields['strDrink'])
            setattr(drink, 'strInstructions', fields['strInstructions'])
            db.session.add(drink)
            db.session.commit()

            return drink.to_dict(), 202

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
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

            # Set session variable after successful registration
            session["user_id"] = user.id

            return make_response(user.to_dict(), 201)
        except ValueError:
            return make_response({ "errors": ["validation errors"] }, 400)

        
api.add_resource(CreateUser, '/create_user')

class UserSettings(Resource):

    def delete(self, id):
        user = Drink.query.filter(User.id==id).one_or_none()
        if user is None:
            return make_response({'error': 'Drink is not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({''}, 204)

api.add_resource(UserSettings, '/user_settings')

class CreateDrink(Resource):
    def post(self):
        data = request.get_json()

        drink = Drink()
        drink_data = {
            "strDrink": data["strDrink"],
            "strInstructions": data["strInstructions"],
            "strDrinkThumb": data.get("strDrinkThumb", ""),  # Updated to strDrinkThumb
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




# class UserDrinks(Resource):

#     def add_to_favorites():
#         data = request.get_json()
#         drink_id = data.get("drinkId")
#         user_id = get_current_user_id()  # Implement your user authentication logic

#         user_drink = UserDrinksAssociation(user_id=user_id, drink_id=drink_id)
#         db.session.add(user_drink)
#         db.session.commit()

#         return jsonify(user_drink.to_dict()), 201
    
# api.add_resource(UserDrinks, '/add_tofavorites')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Implement your user authentication logic here
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        session["user_id"] = user.id
        return make_response({"message": "Login successful"}, 200)
    else:
        return make_response({"message": "Invalid credentials"}, 401)


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return make_response({"message": "Logout successful"}, 200)

@app.route('/check_login', methods=['GET'])
def check_login():
    user_id = session.get("user_id")
    if user_id:
        return make_response({"logged_in": True, "user_id": user_id}, 200)
    else:
        return make_response({"logged_in": False}, 200)

@app.route('/users-with-drinks')
def users_with_drinks():
    # Query the database to get users with their associated drinks
    users_with_drinks = []

    # Assuming you have a User model and a UserDrinksAssociation model
    users = User.query.all()
    
    for user in users:
        user_data = {
            'id': user.id,
            'username': user.username,
            'age': user.age,
            'favoriteDrinks': []  # This will store the user's favorite drinks
        }

        # Query the associated drinks for the current user
        drink_associations = UserDrinksAssociation.query.filter_by(user_id=user.id).all()
        for association in drink_associations:
            drink = Drink.query.get(association.drink_id)
            if drink:
                user_data['favoriteDrinks'].append({
                    'id': drink.id,
                    'strDrink': drink.strDrink,
                    'strInstructions': drink.strInstructions,
                    'strDrinkThumb': drink.strDrinkThumb
                })

        users_with_drinks.append(user_data)

    return jsonify(users_with_drinks)


@app.route('/add-favorite', methods=['POST'])
def add_favorite():
    data = request.get_json()
    user_id = data.get('userId')
    drink_id = data.get('drinkId')

    # Assuming you have a UserDrinksAssociation model
    user_drink_association = UserDrinksAssociation(user_id=user_id, drink_id=drink_id)

    db.session.add(user_drink_association)
    db.session.commit()

    return jsonify({'message': 'Drink added to favorites successfully'})

if __name__ == '__main__':
    app.run(port=5555, debug=True)
