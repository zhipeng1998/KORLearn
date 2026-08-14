FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy prisma schema and code
COPY prisma ./prisma/
COPY server.js .
COPY .env .

# Generate prisma client
RUN npx prisma generate

EXPOSE 3000

# Start server
CMD ["node", "server.js"]
