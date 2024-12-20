FROM node:20 AS base
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run prisma generate
RUN npm run build

FROM node:20-alpine3.19 AS release
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npm run prisma migrate deploy && npm start"]
