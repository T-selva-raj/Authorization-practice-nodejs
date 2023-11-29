require('dotenv').config();

CONFIG={};
CONFIG.db_host=process.env.DB_HOST;
CONFIG.do_port=process.env.DB_PORT;
CONFIG.db_name=process.env.DB_NAME;
CONFIG.db_user=process.env.DB_USER;
CONFIG.db_password=process.env.DB_PASSWORD;
CONFIG.secretkey=process.env.SECRETKEY;
CONFIG.jwt_encryption=process.env.JWT_ENCRYPTION;
CONFIG.jwt_expiration=process.env.JWT_EXPIRATION;

CONFIG.email=process.env.USER_MAIL;
CONFIG.password=process.env.USER_PASSWORD;