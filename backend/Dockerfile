FROM node:16

WORKDIR /app

RUN apt-get update && apt-get install -y \
    netcat

COPY package*.json ./

RUN yarn install

RUN yarn add prisma --dev

COPY db ./db

COPY . .

RUN npx prisma generate

# Add wait-for-it.sh
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3001

CMD /wait-for-it.sh postgres:5432 -- npx prisma migrate dev --name init && yarn start