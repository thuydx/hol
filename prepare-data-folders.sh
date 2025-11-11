#!/bin/bash

cd "$( dirname "$0" )"

folders='projects/frontend projects/backend data/mysql data/tmp configs/mysql config/php configs/nginx/conf.d configs/nginx/php-fpm.d data/logs/nginx data/logs/php-fpm'

mkdir -p $folders
chmod 777 -R $folders
