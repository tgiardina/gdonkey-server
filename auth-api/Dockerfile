FROM node:12
WORKDIR /usr/src/app
COPY ./auth-api/package*.json ./
RUN npm install
COPY ./shared ./
RUN chmod +x ./wait.sh
COPY ./auth-api ./