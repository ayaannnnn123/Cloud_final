# Use official PHP image from the Docker Hub
FROM php:8.0-cli

# Set the working directory
WORKDIR /var/www/html

# Copy project files into the container
COPY . /var/www/html/

# Expose port 80
EXPOSE 80

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/html"]
