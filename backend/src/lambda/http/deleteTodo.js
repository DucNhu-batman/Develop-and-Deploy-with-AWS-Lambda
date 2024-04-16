import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

/**
 * {
      "id":""
    }
 */
const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.TODO_TABLE

export async function handler(event) {
  const parsedBody = JSON.parse(event.body)
  console.log("event", parsedBody)
  await dynamoDbDocument.delete({
    Key: {
      id: parsedBody.id
    },
    TableName: groupsTable
  })

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      id: event.id
    })
  }
}