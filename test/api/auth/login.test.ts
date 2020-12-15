import Auth from '@saintybalboa/auth';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../../src/api/auth/login';

jest.mock('@saintybalboa/auth');

describe('login', () => {
  it('should return the correct data when login attempt successful', async () => {
    const mockLoginResponse = {
      statusCode: 200,
      data: {}
    };
    Auth.prototype.login = jest.fn().mockResolvedValueOnce(mockLoginResponse);

    const body = {
      username: 'test@test.com',
      password: 'password'
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
      resource: null
    };
    const result = await handler(mockEvent);

    expect(Auth.prototype.login).toBeCalledTimes(1);
    expect(Auth.prototype.login).toBeCalledWith(body.username, body.password);
    expect(result).toStrictEqual({
      statusCode: mockLoginResponse.statusCode,
      body: JSON.stringify(mockLoginResponse.data),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-Requested-With': '*'
      }
    });
  });

  it('should return an error data when login attempt failed', async () => {
    const mockLoginResponse = {
      statusCode: 403,
      error: {
        code: 'SOME_ERROR_CODE',
        message: 'Some error message',
        time: 123456789
      }
    };
    Auth.prototype.login = jest.fn().mockResolvedValueOnce(mockLoginResponse);

    const body = {
      username: 'invalid@test.com',
      password: 'invalid_password'
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
      resource: null
    };
    const result = await handler(mockEvent);

    expect(Auth.prototype.login).toBeCalledTimes(1);
    expect(Auth.prototype.login).toBeCalledWith(body.username, body.password);
    expect(result).toStrictEqual({
      statusCode: mockLoginResponse.statusCode,
      body: JSON.stringify(mockLoginResponse.error),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-Requested-With': '*'
      }
    });
  });
});
