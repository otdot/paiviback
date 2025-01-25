FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc

COPY ./build /app/build

CMD ["npm", "run", "start"]