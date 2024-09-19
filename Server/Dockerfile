#FROM node@sha256:903eaf1ae555002624d07066b7ce506dc2fb67b6da3121255b40ff4dc8e7e1b8
FROM node:slim

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .


RUN npm run build
EXPOSE 51111
RUN ls -la
CMD ["npm", "start"]