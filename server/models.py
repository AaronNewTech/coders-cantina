from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData

from config import db

class DrinkIngredientsAssociation(db.Model, SerializerMixin):
    __tablename__ = 'drink_ingredients'

    id = db.Column(db.Integer, primary_key=True)

    drink_id = db.Column(db.Integer, db.ForeignKey("drinks.id"))
              
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"))

class UserDrinksAssociation(db.Model, SerializerMixin):
    __tablename__ = 'user_drinks'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
                         
    drink_id = db.Column(db.Integer, db.ForeignKey("drinks.id"))

class Drink(db.Model, SerializerMixin):
    __tablename__ = 'drinks'

    id = db.Column(db.Integer, primary_key=True)
    strDrink = db.Column(db.String)
    strDrinkThumb = db.Column(db.String)
    strGlass = db.Column(db.String)
    strVideo = db.Column(db.String)
    strCategory = db.Column(db.String)
    strInstructions = db.Column(db.String)
    strIngredient1 = db.Column(db.String)
    strIngredient2 = db.Column(db.String)
    strIngredient3 = db.Column(db.String)
    strIngredient4 = db.Column(db.String)
    strIngredient5 = db.Column(db.String)
    strIngredient6 = db.Column(db.String)
    strIngredient7 = db.Column(db.String)
    strIngredient8 = db.Column(db.String)
    strIngredient9 = db.Column(db.String)
    strIngredient10 = db.Column(db.String)
    strMeasure1 = db.Column(db.String)
    strMeasure2 = db.Column(db.String)
    strMeasure3 = db.Column(db.String)
    

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # relationships
    
    drink_ingredient_associations = db.relationship('DrinkIngredientsAssociation', cascade='all, delete', backref='drink')

    user_drinks = db.relationship('UserDrinksAssociation', backref='drink')

    # serialize rules
    serialize_rules = ('-user_drinks', '-drink',)

    # validations
    @validates('name')
    def validate_name(self, key, name):
        if not name or name.length() <= 0:
            raise ValueError('Invalid name provided')
        return name
    
    @validates('description')
    def validate_drink_description(self, key, drink_description):
        if not drink_description or drink_description.length() <= 0:
            raise ValueError('Invalid drink description provided')
        return drink_description
    
    @validates('price')
    def validate_price(self, key, price):
        if not price or price < 0:
            raise ValueError('Invalid price provided')
        return price
    
    @validates('ingredients_needed')
    def validate_price(self, key, ingredients_needed):
        if not ingredients_needed or ingredients_needed < 0:
            raise ValueError('Invalid ingredients needed provided')
        return ingredients_needed


    def __repr__(self):
        return f'<Drink {self.id}>'




class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    
    # user_id = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    drink_ingredient_associations = db.relationship('DrinkIngredientsAssociation', cascade='all, delete', backref='ingredient')

    # relationships

    # drink_ingredients = db.relationship('Drink', cascade='all, delete', backref='ingredient')

    # serialize rules
    serialize_rules = ('-user_ingredients', '-ingredient', '-drink_ingredients',)

    # validations
    @validates('name')
    def validate_name(self, key, name):
        if not name or name.length() <= 0:
            raise ValueError('Invalid name provided')
        return name
    
    @validates('ingredient_description')
    def validate_ingredient_discription(self, key, ingredient_description):
        if not ingredient_description or ingredient_description.length() <= 0:
            raise ValueError('Invalid ingrredient description provided')
        return ingredient_description

    

    def __repr__(self):
        return f'<Ingredient {self.id}>'
    

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships 
    user_drinks = db.relationship('UserDrinksAssociation', cascade='all, delete', backref='user')

    # serialize rules
    serialize_rules = ('-drink.users', '-ingredient.users',)


    #validations
    @validates('display_name')
    def validate_display_name(self, key, display_name):
        if not display_name or display_name.length() <= 0:
            raise ValueError('Invalid display_name provided')
        return display_name
    
    @validates('username')
    def validate_username(self, key, username):
        if not username or username.length() <= 0:
            raise ValueError('Invalid username provided')
        return username
    
    @validates('password')
    def validate_password(self, key, password):
        if not password or password.length() <= 0:
            raise ValueError('Invalid password provided')
        return password

    def __repr__(self):
        return f'<User {self.id}>'
    

