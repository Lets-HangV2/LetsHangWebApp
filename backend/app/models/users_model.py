from mongoengine import *
import datetime

class UserModel(Document):
   username = StringField(max_length=200, unique=True, required=True)
   password = StringField(required=True)
   email = StringField(max_length=100, unique=True, required=True)