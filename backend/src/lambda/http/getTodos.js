import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE

export async function handler(event) {
  const result = await dynamoDbDocument.scan({
    TableName: groupsTable
  })
  return {
    "isBase64Encoded": false,
    "statusCode": 200,
    'headers': { 'Content-Type': 'application/json' },
    "body": JSON.stringify({
      items: result.Items
    })
  }
}