import os
import falcon_jsonify

class AuthMiddleware(object):

    def process_request(self, req, resp):
        
        avaliablePaths = ['/', '/login', '/register', '/getUsers']
    
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

dbcfg = {
    'host': 'localhost', # or external server address
    'port': 27017,
    'username': os.environ.get('MONGO_USER'),
    'password': os.environ.get('MONGO_PASS'),
}



middleware = [
    AuthMiddleware(),
]