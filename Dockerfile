FROM node:20.12.2

WORKDIR /app-backend

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run"]
CMD ["dev"]