from mongoengine import *
import datetime

class UserModel(Document):
   username = StringField(max_length=200, unique=True)
   password = StringField(max_length=32)