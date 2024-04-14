import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('auth')
const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJRAtM17QlE3IlMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi10YTN4ZXE4Z255a2M2em8yLnVzLmF1dGgwLmNvbTAeFw0yNDA0MTMw
MzMyMzVaFw0zNzEyMjEwMzMyMzVaMCwxKjAoBgNVBAMTIWRldi10YTN4ZXE4Z255
a2M2em8yLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBALzibV8nR7kr5E8z7lwmdgX2VJZGUizbrEGXGEO22txQhyiCv7MtGyzoVWoP
KY+dSnzXYIArr9bGdfC7EIhaUg2+RiJl9Ad9IB4wakxPD+KjBsFl2BVchbmoNWQw
Q79UrirrXwXLDbq3Zc7n+zz/9OJYqdIgWUvhWufngjCfq5aoU/bXzrNPorhtQX2R
g5/nhw2/hlJfPuP0f3zfXqEOu3ZkodCM68XrMTPPNKuIOq94qtXrcoupeIZ7Ilqh
3iruUYG/0jheMmcjONGwLzeKaIp7sGVQ3R1IFBWZapYjld8stqI5y+5RKgZrlDAG
8SBaVQu7tEuRCPZIbBp+JPS9WKkCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQU1pKzYc03YYQo9lav/YeCLwpeQc4wDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQAQB2n8iniIzfW44sfXhPNwcu2tRnGrf6QCu0AInJeM
ldoC43rT/DIeYVH4nvTz25jd1SN1XZJSDrlgSE/KdArSSaTb+q+88V3OWD2+s0Ik
LE8t6DaRJJRQ2zmCKx4jGNEe7oSLrRNlYAbbg/2jiCr16v8P7YMh3hf6+prPcSCZ
PvBO96rfL5xuFQnRn2sFVcUn2XlkjVqntsuhzIAtNTsSKQiPjHHl1Me0lz3caIhQ
4g8BmPLaxC5b7rbhvITCO48QGcwCZQ3BqME5b9oTUIckN2wKSUagNmHYIhp0Ctjp
gB9wJzicBya4TXCjk5Kc8tuJHntwv/e1FF4Vb3fu/2AH
-----END CERTIFICATE-----`
// const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  const jwt = jsonwebtoken.decode(token, { complete: true })

  // TODO: Implement token verification
  return {
    'isBase64Encoded': false,
    'statusCode': 200,
    
    'body': "body"
  };
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
