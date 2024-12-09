FROM php:8.1-apache

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod headers

# Install SQLite and required dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP SQLite extension
RUN docker-php-ext-install pdo_sqlite

# Install any needed PHP extensions
RUN docker-php-ext-install opcache

# Copy Apache configuration
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copy application files
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Enable Apache configuration
RUN a2ensite 000-default.conf

# Expose port 80
EXPOSE 80