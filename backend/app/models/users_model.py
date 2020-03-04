from mongoengine import *
import datetime

class UserModel(Document):
   first_name = StringField(max_length=200, required=True)
   last_name = StringField(max_length=200, required=True)
   username = StringField(max_length=200, unique=True, required=True)
   password = StringField(required=True)
   email = StringField(max_length=100, unique=True, required=True)