FROM node:24.14.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Build and generate main prisma
RUN node src/prisma/schema-builder.js
RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 3000

# npm run start:dev
CMD ["npm", "run", "start:dev"]