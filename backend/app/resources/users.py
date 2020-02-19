import falcon
import json
#from app.controllers.notes import NotesController
from app import db
from app.models.users_model import UserModel
from mongoengine import NotUniqueError 

class Register(object):
        
    def on_post(self, req, resp):
        username = req.get_json('username')
        password = req.get_json('password')
        email = req.get_json('email')

        userObj = UserModel(username=username, password=password, email=email)
        
        try:
            userObj.save()
        except NotUniqueError:
            resp.json = {
                "status": "fail",
                "reason": "Username or Email already exist"
            }

        resp.json = {
            "status": "successful",
        }
        