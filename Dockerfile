FROM node:17.8.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["node","server.js"]
