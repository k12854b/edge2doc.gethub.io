FROM node:20

WORKDIR D:/SAMU-POLICE

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]