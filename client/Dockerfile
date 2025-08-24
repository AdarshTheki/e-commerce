FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile || npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Vite to Nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
