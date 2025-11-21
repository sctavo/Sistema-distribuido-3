FROM node:18-slim

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 5102
CMD ["npm", "start"]
