import Auth from '@saintybalboa/auth';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../../src/api/auth/login';

jest.mock('@saintybalboa/auth');

describe('login', () => {
  it('should return the correct response', async () => {
    const mockLoginResponse = {
      statusCode: 200,
      body: '',
    };
    Auth.prototype.login = jest.fn().mockResolvedValueOnce(mockLoginResponse);

    const body = {
      username: 'test@test.com',
      password: 'password',
    };
    const mockEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(body),
      headers: null,
      httpMethod: 'POST',
      multiValueHeaders: null,
      isBase64Encoded: false,
      path: '/user/login',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: null,
      resource: null,
    };
    const result = await handler(mockEvent);

    expect(Auth.prototype.login).toBeCalledTimes(1);
    expect(Auth.prototype.login).toBeCalledWith(body.username, body.password);
    expect(result).toStrictEqual({ statusCode: mockLoginResponse.statusCode, body: mockLoginResponse.body });
  });
});
