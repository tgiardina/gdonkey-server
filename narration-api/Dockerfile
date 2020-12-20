FROM node:12
WORKDIR /usr/src/app
COPY ./narration-api/package*.json ./
RUN npm install
COPY ./shared ./
RUN chmod +x ./wait.sh
COPY ./narration-api ./