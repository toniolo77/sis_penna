# Tesis

composer create-project --prefer-dist laravel/laravel sistema_penna

sudo apt-get install mysql-server
CREATE DATABASE sistema_penna;
CREATE USER 'admin'@'localhost' IDENTIFIED BY '123123';
GRANT ALL PRIVILEGES ON sistema_penna.* TO 'admin'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON infomation_schema.* TO 'admin'@'localhost' WITH GRANT OPTION;
configurar .env
permisos en bootstrap/cache y storage
sudo apt-get install php-mbstring
sudo apt-get install phpunit
composer update
php artisan key:generate
sudo apt-get install php-mysql
php artisan migrate
