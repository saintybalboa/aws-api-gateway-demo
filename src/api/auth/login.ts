import 'source-map-support/register';
import Auth from '@saintybalboa/auth';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { username, password } = JSON.parse(event.body);
  const auth = new Auth({ userPoolId: process.env.USER_POOL_ID, clientId: process.env.CLIENT_ID });
  const response = await auth.login(username, password);

  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.data || response.error)
  };
};
