import falcon
import mongoengine as mongo
from app.settings import middleware
app = falcon.API(middleware=middleware)

db = mongo.connect(
    'development',
    host= 'localhost',
    port= 27017,
    username= 'root',
    password= 'password'
)

from app.resources.users import *
#app.add_route('/notes', RegisterUsers)
app.add_route('/notes', GetUsers())