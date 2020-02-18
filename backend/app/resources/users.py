import falcon
#from app.controllers.notes import NotesController
from app import db
from app.models.users_model import UserModel

class GetUsers(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.json = {
            'notes': 'GETUSERS'
        }

'''        
class RegisterUsers(object):
    def on_post(self, req, resp):
        title = resp.get_json('title', dtype=str)
        body = resp.get_json('body', dtype=str)
        notes_obj = NoteModel(
            title=title, body=body
        )
        notes_obj.save()
        resp.status = falcon.HTTP_201
        resp.json = {
            'message': 'Your Note Has Been Posted!',
            'status': 200,
            'successful': True
        }
'''