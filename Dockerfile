# Use official Node.js 20 image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    else npm ci; fi

# Copy rest of the app
COPY . .

# Build Next.js app
RUN yarn build || npm run build

ENV PORT=4510

# Expose port
EXPOSE 4510

# Start Next.js app
CMD ["yarn", "start"]