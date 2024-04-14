import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

/**
 * {
      "todoId":"605525c4-d36c-1234-b3ff-65b853344123",
      "userId":"google-oauth2|115783759495544745774",
      "attachmentUrl":"https://serverless-c4-todo-images.s3.amazonaws.com/605525c4-1234-4d23-b3ff-65b853344123",
      "dueDate":"2022-12-12",
      "createdAt":"2022-11-28T22:04:08.613Z",
      "name":"Buy bread",
      "done":false
    }
 */
const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

const groupsTable = process.env.GROUPS_TABLE

export async function handler(event) {
  const itemId = uuidv4()
  const parsedBody = JSON.parse(event.body)
  console.log("parsedBody", parsedBody)
  const newItem = {
    id: itemId,
    ...parsedBody
  }

  await dynamoDbDocument.put({
    TableName: groupsTable,
    Item: newItem
  })

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem
    })
  }
}