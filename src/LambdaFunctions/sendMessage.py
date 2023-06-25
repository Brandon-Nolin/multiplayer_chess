import json
import boto3

def lambda_handler(event, context):
    message = json.loads(event['body'])['message']
    connection_id = event['requestContext']['connectionId']
    room_id = message['roomCode']

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Chess-Connections')
    apigw_management_client = boto3.client('apigatewaymanagementapi', endpoint_url='https://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production/')

    # Retrieve the chess game state item
    response = table.get_item(Key={'connectionId': room_id})
    existing_item = response.get('Item')
    
    if message['type'] == 'start':
        apigw_management_client.post_to_connection(ConnectionId=existing_item['guestID'], Data=json.dumps({'ownerIsWhite' : existing_item['ownerIsWhite']}).encode('utf-8'))
        return {"statusCode": 200,}
        
    if message['type'] == 'move':
        board_state = message['boardState']
        if connection_id == existing_item['ownerID']:
            apigw_management_client.post_to_connection(ConnectionId=existing_item['guestID'], Data=json.dumps({'boardState' : board_state}).encode('utf-8'))
        if connection_id == existing_item['guestID']:
            apigw_management_client.post_to_connection(ConnectionId=existing_item['ownerID'], Data=json.dumps({'boardState' : board_state}).encode('utf-8'))

    
    return {"statusCode": 200}