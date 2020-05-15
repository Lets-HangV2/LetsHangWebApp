import json
import boto3
import botocore
import uuid
import bcrypt
from boto3.dynamodb.conditions import Attr, Key

def testing(event, context):
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def get_users(event, context):

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("Users")

    all_items = table.scan()

    response = {
        "statusCode": 200,
        "body": json.dumps(all_items['Items'])
    }

    return response


def register(event, context):

    payload = json.loads(event['body'])
    user_id = str(uuid.uuid4())
    username = payload['username']
    password = payload['password']
    email = payload['email']
    first_name = payload['first_name']
    last_name = payload['last_name']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("Users")

    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    message = "Sucessful"

    try:
        table_response = table.put_item(
            Item = {
                'user_id': user_id,
                'username': username,
                'password': hashedPassword,
                'email': email,
                'first_name': first_name,
                'last_name': last_name
            },
            ConditionExpression = 'attribute_not_exists(username) AND attribute_not_exists(email)'
        )
    except botocore.exceptions.ClientError as e:
       if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
        message = 'ERROR: Username or Email was not unique'

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "status": message
        })
    }

    return response


def login(event, context):

    payload = json.loads(event['body'])
    username = payload['username']
    password = payload['password']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("Users")


def send_friend_request(event, context):

    message = "Success"
    #payload = json.loads(event['body'])
    #payload = event['body']
    fromUsername = event['fromUsername']
    toUsername = event['toUsername']

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("publicUsers")

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
        "body": json.dumps({
            "status": message
        })
    }

    return response

def accept_friend_request(event, context):
    # when accepting we take in a request_id and a update both toUsername and fromUsername to have eachother in friends table

    message = "Success"
    #payload = json.loads(event['body'])
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("publicUsers")

    fromUsername = event['fromUsername']
    toUsername = event['toUsername']

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
        "body": json.dumps({
            "status": message
        })
    }

    return response




def get_friend_requests(event, context):
    # when we get friend request we wanna return request_id, fromUsername so when we accept the request we can just pass in the req_id to be deleted
    #pass in username only

    #payload = json.loads(event['body'])
    toUsername = event['username']

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
        "body": json.dumps(friendReqList)
    }

    return response
