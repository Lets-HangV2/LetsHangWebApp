import json
import boto3
import botocore
import uuid
import bcrypt
from datetime import datetime
from boto3.dynamodb.conditions import Attr, Key
from amadeus import Client, ResponseError, Location


def send_friend_request(event, context):

    payload = json.loads(event['body'])
    #payload = event
    fromUsername = payload['fromUsername']
    toUsername = payload['toUsername']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("publicUsers")

    message = "Success"

    result = table.update_item(
        Key={
            'username': toUsername
        },
        UpdateExpression="SET friend_requests = list_append(friend_requests, :i)",
        ExpressionAttributeValues={
            ':i': [fromUsername]
        },
        ReturnValues="UPDATED_NEW"
    )
    if result['ResponseMetadata']['HTTPStatusCode'] != 200:
        message = "Failed"

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps({
            "status": message
        })
    }

    return response

def accept_friend_request(event, context):
    # when accepting we take in a request_id and a update both toUsername and fromUsername to have eachother in friends table

    payload = json.loads(event['body'])
    #payload = event
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("publicUsers")

    fromUsername = payload['fromUsername']
    toUsername = payload['toUsername']

    message = "Success"

    #get item of toUsername from publicUsers
    response = table.get_item(
        Key={
            'username': toUsername
        }
    )
    if response['ResponseMetadata']['HTTPStatusCode'] != 200:
        message = "Failed in getting Index"

    friendReqList = response['Item']['friend_requests']

    #find the index of fromUsername
    count = 0
    indexFrom = 0
    for req in friendReqList:
        if req == fromUsername:
            indexFrom = count
        count += 1

    stringExpresion = "REMOVE friend_requests[" + str(indexFrom) + "]"

    #remove the friend request by index
    result = table.update_item(
        Key={
            'username': toUsername
        },
        UpdateExpression=stringExpresion
    )
    if result['ResponseMetadata']['HTTPStatusCode'] != 200:
        message = "Failed in removing request"

    #inserts friend into fromUsername key
    result = table.update_item(
        Key={
            'username': fromUsername
        },
        UpdateExpression="SET friends = list_append(friends, :i)",
        ExpressionAttributeValues={
            ':i': [toUsername]
        },
        ReturnValues="UPDATED_NEW"
    )
    if result['ResponseMetadata']['HTTPStatusCode'] != 200:
        message = "Failed at inserting friend into fromUsername"

    #inserts friend into toUsername key
    result = table.update_item(
        Key={
            'username': toUsername
        },
        UpdateExpression="SET friends = list_append(friends, :i)",
        ExpressionAttributeValues={
            ':i': [fromUsername]
        },
        ReturnValues="UPDATED_NEW"
    )
    if result['ResponseMetadata']['HTTPStatusCode'] != 200:
        message = "Failed at inserting friend into toUsername"

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps({
            "status": message
        })
    }

    return response


def get_friend_requests(event, context):
    # when we get friend request we wanna return request_id, fromUsername so when we accept the request we can just pass in the req_id to be deleted
    #pass in username only

    payload = json.loads(event['body'])
    #payload = event
    toUsername = payload['username']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("publicUsers")

    #get item of toUsername from publicUsers
    response = table.get_item(
        Key={
            'username': toUsername
        }
    )

    friendReqList = response['Item']['friend_requests']

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(friendReqList)
    }

    return response


def get_hotel_city(event, context):
    #format:
    #'cityName': 'cityName'

    amadeus = Client(
        client_id='jRfuscAlEGTr79S9bWUVED66wdGCErku',
        client_secret='XCC7I0GCfVIz7jAr'
    )

    payload = json.loads(event['body'])
    #payload = event
    cityName = payload['cityName']

    locationList = []

    try:
        response = amadeus.reference_data.locations.get(keyword=cityName, subType=Location.ANY)

        for element in response.data:
            location = {}
            location['cityCode'] = element['address']['cityCode']

            if('stateCode' in element['address']):
                location['cityName'] = ("%s, %s %s" % (element['address']['cityName'], element['address']['stateCode'], element['address']['countryCode']))
            else:
                location['cityName'] = ("%s, %s " % (element['address']['cityName'], element['address']['countryCode']))

            if location not in locationList:
                locationList.append(location)

    except ResponseError as error:
        response = {
            "message": "Failed"
        }
        return response

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(locationList)
    }
    return response


def get_hotels(event, context):

    #format:
    #'cityCode': 'cityCode'

    amadeus = Client(
        client_id='jRfuscAlEGTr79S9bWUVED66wdGCErku',
        client_secret='XCC7I0GCfVIz7jAr'
    )

    payload = json.loads(event['body'])
    #payload = event
    cityCode = payload['cityCode']

    hotelList = []

    try:
        # Get list of Hotels by city code
        hotels_by_city = amadeus.shopping.hotel_offers.get(cityCode=cityCode)

        for element in hotels_by_city.data:
            hotelObj = {}

            hotel_id = element['hotel']['hotelId']
            name = element['hotel']['name']
            distance = ("%s %s"%(element['hotel']['hotelDistance']['distance'], element['hotel']['hotelDistance']['distanceUnit']))
            rating = element['hotel']['rating']
            price = ("%s %s"%(element['offers'][0]['price']['total'], element['offers'][0]['price']['currency']))
            roomDesc = element['offers'][0]['room']['description']['text']

            hotelObj['name'] = name
            hotelObj['rating'] = rating
            hotelObj['distance'] = distance
            hotelObj['price'] = price
            hotelObj['hotel_id'] = hotel_id

            if hotelObj not in hotelList:
                hotelList.append(hotelObj)


    except ResponseError as error:
        response = {
            "message": "ERROR",
            "code": error
        }
        return response

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(hotelList)
    }

    return response

def get_hotel_offers(event, context):
    #format:
    #'id': 'hotel ID'
    #'checkInDate': 'checkInDate'
    #'checkOutDate': 'checkOutDate'

    amadeus = Client(
        client_id='jRfuscAlEGTr79S9bWUVED66wdGCErku',
        client_secret='XCC7I0GCfVIz7jAr'
    )

    payload = json.loads(event['body'])
    #payload = event
    id = payload['id']
    inDate = payload['checkInDate']
    outDate = payload['checkOutDate']

    offerList = []

    try:
        hotel_offers = amadeus.shopping.hotel_offers_by_hotel.get(hotelId=id, checkInDate=inDate, checkOutDate=outDate)
        hotelData = hotel_offers.data['hotel']
        offersData = hotel_offers.data['offers']

        hotelName = "%s in %s, %s"%(hotelData['name'],hotelData['address']['cityName'],hotelData['address']['stateCode'] )
        offerList.append(hotelName)
        for element in offersData:
            hotelObj = {}

            hotelObj['price'] = "%s %s"%(element['price']['total'],element['price']['currency'])
            hotelObj['beds'] = "%s %s"%(element['room']['typeEstimated']['beds'], element['room']['typeEstimated']['bedType'])
            hotelObj['guests'] = "%s Adults"% (element['guests']['adults'])
            hotelObj['checkInDate'] = element['checkInDate']
            hotelObj['checkOutDate'] = element['checkOutDate']
            hotelObj['link'] = element['self']

            if hotelObj not in offerList:
                offerList.append(hotelObj)


    except ResponseError as error:
        print(error)
        pass

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(offerList)
    }

    return response


def user_serch(event, context):
    #format:
    #'name': 'searched username'

    payload = json.loads(event['body'])
    #payload = event
    inputName = payload['name']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("publicUsers")

    items = table.scan()['Items']

    usernames = []
    matchedUsernames = []

    for item in items:
        usernames.append(item['username'])

    for name in usernames:
        if inputName in name:
            matchedUsernames.append(name)

    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(matchedUsernames)
    }

    return response


def send_message(event, context):

    payload = json.loads(event['body'])
    #payload = event
    # current date and time
    now = datetime.now()
    timestamp = int(datetime.timestamp(now))
    event_id = payload['event_id']
    username = payload['username']
    content = payload['message']
    index = 0
    message = "Sucessful"

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("messages")

    try:
        # Get the next message index
        response = table.query(KeyConditionExpression="event_id = :room",
                ExpressionAttributeValues={":room": event_id},
                Limit=1, ScanIndexForward=False)
        items = response.get("Items", [])
        index = items[0]["index"] + 1 if len(items) > 0 else 0
    except ResponseError as e:
        message = 'ERROR: Indexing failed'


    table_response = table.put_item(
        Item = {
            'event_id': event_id,
            'content': content,
            'index': index,
            'time': timestamp,
            'username': username
        }
    )

    # Get the 1st most recent chat messages
    response = table.query(KeyConditionExpression="event_id = :room",
            ExpressionAttributeValues={":room": event_id},
            Limit=1, ScanIndexForward=False)
    items = response.get("Items", [])
    messages = []
    # Extract the relevant data and order chronologically

    for x in items:
        time = x["time"]
        timestamp = str(datetime.fromtimestamp(time))
        messages.append({"username": x["username"], "content": x["content"], "time": timestamp})
    messages.reverse()


    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(messages)
    }

    return response


def get_messages(event, context):
    #pass in: event_id

    payload = json.loads(event['body'])
    #payload = event
    event_id = payload['event_id']


    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("messages")

    # Get all the most chat messages
    response = table.query(KeyConditionExpression="event_id = :room",
            ExpressionAttributeValues={":room": event_id},
            ScanIndexForward=False)
    items = response.get("Items", [])
    messages = []

    # Extract the relevant data and order chronologically

    for x in items:
        time = x["time"]
        timestamp = str(datetime.fromtimestamp(time))
        messages.append({"username": x["username"], "content": x["content"], "time": timestamp})
    messages.reverse()


    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': "true",
        },
        "body": json.dumps(messages)
    }

    return response
