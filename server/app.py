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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

