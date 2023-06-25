import json
import boto3

def lambda_handler(event, context):
    room_id = event['queryStringParameters'].get('roomID')
    connection_id = event['requestContext']['connectionId']
    is_white = event['queryStringParameters'].get('isWhite')

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Chess-Connections')
    apigw_management_client = boto3.client('apigatewaymanagementapi', endpoint_url='https://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production/')

    # Check if the item already exists
    response = table.get_item(Key={'connectionId': room_id})
    existing_item = response.get('Item')

    if existing_item:
        # Item exists, update the item to have guestID
        existing_item['guestID'] = connection_id

        response = table.put_item(Item=existing_item)
        
        apigw_management_client.post_to_connection(ConnectionId=existing_item['ownerID'], Data=json.dumps("Other user connected").encode('utf-8'))
    else:
        # Item doesn't exist, create a new item with ownerID and ownerIsWhite
        item = {
            'connectionId': room_id,
            'ownerID': connection_id,
            'ownerIsWhite': is_white
        }

        response = table.put_item(Item=item)
        
    return {"statusCode": 200}