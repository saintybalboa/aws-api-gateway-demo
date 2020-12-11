# AWS API Gateway demo

An AWS API Gateway setup as a central point of communication between other services.

Supports the node version specified in [.nvmrc](.nvmrc)

## Local setup

Uses [Serverless](https://www.serverless.com/) with the following plugins for local development:
- [serverless-offline](https://www.npmjs.com/package/serverless-offline): emulates AWS API Gateway on your local machine.
- [serverless-dotenv-plugin](https://www.npmjs.com/package/serverless-dotenv-plugin): preloads environment variables from `.env` into serverless.
- [serverless-plugin-typescript](https://www.npmjs.com/package/serverless-plugin-typescript): automatically compiles Typescript on file change and restarts services in local development.

Install dependencies:
```bash
npm i -g serverless
npm i
```

Create a `.env` file with the following environment variables:
```bash
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=XXXX
CLIENT_ID=XXXX
USER_POOL_ID=XXXX
```

Startup:
```bash
SLS_DEBUG=* sls offline --config local-dev.yml
```
