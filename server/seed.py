#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, render_template
from flask_restful import Api, Resource
import os
import requests

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Drink, Ingredient, User
from random import choice as rc, randrange

from app import app
from models import db, Drink, Ingredient, User, DrIngAssociation

with app.app_context():   
    # Drink.query.delete()
    

    if __name__ == '__main__':
        fake = Faker()
        with app.app_context():
            print("Starting seed...")
            # Seed code goes here!
            
    def get_ingredients():
        ingredients = Drink.query.all()



    

    
   

    # @app.route("/drink")
    # def get_drinks():
    # for i in range(11000, 11550):
    #     url = f'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={i}'
    #     response = requests.get(url)
    #     data = response.json()

    #     if data['drinks'] is not None:
    #         drink_data = data['drinks'][0]

    #         # Use the loop index as the ID
    #         drink_data['idDrink'] = str(i)

    #         drink = Drink.query.get(drink_data['idDrink'])

    #         if not drink:
    #             drink = Drink(id=drink_data['idDrink'])

    #         for attr, value in drink_data.items():
    #             setattr(drink, attr, value)

    #         db.session.add(drink)
    #         db.session.commit()



        

