import json
import boto3

def lambda_handler(event, context):
    connection_id = event['requestContext']['connectionId']

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Chess-Connections')

    # Query the DynamoDB table for items with matching ownerID or guestID
    response = table.scan(
        FilterExpression='ownerID = :id OR guestID = :id',
        ExpressionAttributeValues={':id': connection_id}
    )
    items = response['Items']

    # Delete each item found
    for item in items:
        table.delete_item(Key={'connectionId': item['connectionId']})