FROM node:16
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "server.js"]
EXPOSE 3000