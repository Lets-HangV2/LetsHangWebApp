import falcon
import mongoengine as mongo
from app.settings import middleware
app = falcon.API(middleware=middleware)

db = mongo.connect(
    'LetsHang',
    host= 'localhost',
    port= 27017,
    username= 'admin',
    password= 'pass',
    authentication_source='admin'
)

print(db)

from app.resources.users import *
app.add_route('/register', Register())

#db.createUser({ user:"admin", pwd: "pass", roles: [{role: "userAdminAnyDatabase", db: "admin"}] })