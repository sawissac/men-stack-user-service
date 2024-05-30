# MEN (Mongodb, Express, Nodejs) (USER Service)

Simple example for backend men stack.

# Get Started 🚩

 For db; I use docker:

```docker
docker network create mongo_network &&
docker run -e ME_CONFIG_MONGODB_SERVER=mongo-server -e ME_CONFIG_BASICAUTH_USERNAME=mongoadmin -e ME_CONFIG_BASICAUTH_PASSWORD=password --network=mongo_network  mongo-express:latest
```

Config .env
```.env
PORT=3000
DB_URL=mongodb://username:password@localhost:27017/your_db_name?authSource=admin

#credentials password generator
CREDENTIALS_PASSWORD_LENGTH=23
CREDENTIALS_SALTROUND=12

NODE_MAILER_EMAIL_ACC=you_gmail@gmail.com
NODE_MAILER_EMAIL_PASS=gmail_password

OTP_MAX_ATTEMPTS=3
```

For interective ui:

```docker cmd
docker run -e ME_CONFIG_MONGODB_URL=mongodb://mongoadmin:password@mongo-server:27017/app-user?authSource=admin -e ME_CONFIG_BASICAUTH_USERNAME=username -e ME_CONFIG_BASICAUTH_PASSWORD=password -e ME_CONFIG_BASICAUTH=true --network=mongo_network --name mongo-sever-ui -p 8081:8081  -d mongo-express:latest
```


Finally run:
```
yarn gen:ssl && yarn db:up && yarn dev
```

# Lib 📚

```json
{
    "dependencies": {
    "@types/jsonwebtoken": "^9.0.6",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "handlebars": "^4.7.8",
    "jsonwebtoken": "^9.0.2",
    "lodash": "^4.17.21",
    "moment": "^2.30.1",
    "mongoose": "^8.3.4",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.13",
    "short-uuid": "^5.2.0",
    "uuid": "^9.0.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/handlebars": "^4.1.0",
    "@types/lodash": "^4.17.4",
    "@types/moment": "^2.13.0",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.12.12",
    "@types/nodemailer": "^6.4.15",
    "@types/uuid": "^9.0.8",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "nodemon": "^3.1.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}

```
