import falcon
import mongoengine as mongo
from app.settings import middleware

class AuthMiddleware(object):

    def process_request(self, req, resp):
        
        avaliablePaths = ['/', '/login', '/register', '/getUsers', '/searchUsers']
    
        if req.path not in avaliablePaths:
            token = req.get_header('authorization')

            if token is None:
                description = ('Please provide an auth token as part of the request.')
                raise falcon.HTTPUnauthorized('Auth token required')
            else:
                try:
                    payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                    req.user = payload['user'] 
                except (jwt.DecodeError, jwt.ExpiredSignatureError):
                    raise falcon.HTTPUnauthorized('Invalid Token')



app = falcon.API(middleware=[AuthMiddleware()])

db = mongo.connect(
    'LetsHang',
    host= 'localhost',
    port= 27017,
    username= 'admin',
    password= 'pass',
    authentication_source='admin'
)

from app.resources.users import *
app.add_route('/register', Register())
app.add_route('/getUsers', ListUsers())
app.add_route('/login', Login())
app.add_route('/home', Home())
app.add_route('/searchUsers', SearchUser())

#db.createUser({ user:"admin", pwd: "pass", roles: [{role: "userAdminAnyDatabase", db: "admin"}] })