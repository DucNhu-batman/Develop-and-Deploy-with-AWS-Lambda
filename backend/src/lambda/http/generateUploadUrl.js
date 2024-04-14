export const handler = async (event) => {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  return {
    'isBase64Encoded': false,
    'statusCode': 200,
    
    'body': "body"
  }
}

