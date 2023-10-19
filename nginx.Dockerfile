# Use the official Nginx image
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your Gatsby build files to the web root
COPY ./public /usr/share/nginx/html

# Expose the port that Nginx listens on (default is 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
