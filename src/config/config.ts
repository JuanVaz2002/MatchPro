
const MYSQL_HOST = "localhost";
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "arkusSQL#1234";
const MYSQL_DATABASE = "matchprodb";
const MYSQL_PORT = 3306;
const MYSQL_WAITFORCONNECTIONS = true;
const MYSQL_CONNECTIONLIMIT = 10;

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
}

const SERVER = {
    hostname: MYSQL_HOST,
    port: MYSQL_PORT
}

const config = {
    mysql: MYSQL,
    server: SERVER
}

export default config;