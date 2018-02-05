# `sandbox-serverless`

## Setup

```sh
# install java for serverless-dynamodb-local
brew update
brew cask install java

# install npm dependencies
npm install

# install dynamodb plugin for serverless
npm run sls dynamodb install

# setup serverless credentials, even for local, this is required
# dummy credentials are fine for local
npm run sls config credentials -- --provider aws --key KEY --secret SECRET

# development
npm run dev

# invoking individual functions
npm run invoke FUNCTION
```

Take a look at `package.json` to get a sense of the `npm` scripts available.

## Troubleshooting

#### Requests are Timing Out

If requests are timing out, it’s likely that the AWS credentials have not been set, and for some reason, the DocumentClient would attempt to connect to the US East region cluster instead of the local DynamoDB instance.

#### Missing Tables

When using `serverless-dynamodb-local`, make sure that `migrate: true` is set inside of `serverless.yml`. Else the tables will not be created.

