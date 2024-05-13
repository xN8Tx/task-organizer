FROM node:18

WORKDIR /app

COPY ./package.json ./
RUN npm install
COPY . .
COPY ../../configs/env/prod/client.env ./

RUN npm run build

CMD [ "npm", "run", "preview" ]
