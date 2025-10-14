// The purpose of this file is to allow running Laravel Echo Server
// configured entirely with environment variables.

require('dotenv').config();
const echo = require('./dist/index.js');

const options = {
    "authHost": process.env.LARAVEL_ECHO_SERVER_AUTH_HOST || "http://localhost",
    "authEndpoint": process.env.LARAVEL_ECHO_SERVER_AUTH_ENDPOINT || "/broadcasting/auth",
    "clients": [
    ],
    "database": process.env.LARAVEL_ECHO_SERVER_DATABASE || "redis",
    "databaseConfig": {
        "redis": {
            "port": process.env.LARAVEL_ECHO_SERVER_REDIS_PORT || "6379",
            "host": process.env.LARAVEL_ECHO_SERVER_REDIS_HOST || "localhost",
            "password": process.env.LARAVEL_ECHO_SERVER_REDIS_PASSWORD || null,
            "database": parseInt(process.env.LARAVEL_ECHO_SERVER_REDIS_DB) || 0,
            "keyPrefix": process.env.LARAVEL_ECHO_SERVER_REDIS_KEY_PREFIX || ""
        },
        "sqlite": {
            "databasePath": process.env.LARAVEL_ECHO_SERVER_SQLITE_PATH || "/database/laravel-echo-server.sqlite"
        }
    },
    "devMode": process.env.LARAVEL_ECHO_SERVER_DEBUG === 'true',
    "host": process.env.LARAVEL_ECHO_SERVER_HOST || "localhost",
    "port": process.env.LARAVEL_ECHO_SERVER_PORT || "6001",
    "protocol": process.env.LARAVEL_ECHO_SERVER_PROTO || "http",
    "socketio": {
        "cors": {
            "origin": process.env.LARAVEL_ECHO_SERVER_CORS_ORIGIN || "*",
            "methods": (process.env.LARAVEL_ECHO_SERVER_CORS_METHODS || "GET,POST").split(','),
            "allowedHeaders": (process.env.LARAVEL_ECHO_SERVER_CORS_HEADERS || "Origin,Content-Type,X-Auth-Token,X-Requested-With,Accept,Authorization,X-CSRF-TOKEN,X-Socket-Id").split(','),
            "credentials": process.env.LARAVEL_ECHO_SERVER_CORS_CREDENTIALS === 'true'
        },
        "allowEIO3": process.env.LARAVEL_ECHO_SERVER_SOCKET_IO_EIO3 !== 'false'
    },
    "secureOptions": parseInt(process.env.LARAVEL_ECHO_SERVER_SECURE_OPTIONS) || 67108864,
    "sslCertPath": process.env.LARAVEL_ECHO_SERVER_SSL_CERT_PATH || "",
    "sslKeyPath": process.env.LARAVEL_ECHO_SERVER_SSL_KEY_PATH || "",
    "sslCertChainPath": process.env.LARAVEL_ECHO_SERVER_SSL_CERT_CHAIN_PATH || "",
    "sslPassphrase": process.env.LARAVEL_ECHO_SERVER_SSL_PASSPHRASE || "",
    "subscribers": {
        "http": process.env.LARAVEL_ECHO_SERVER_HTTP_SUBSCRIBER !== 'false',
        "redis": process.env.LARAVEL_ECHO_SERVER_REDIS_SUBSCRIBER !== 'false'
    },
    "apiOriginAllow": {
        "allowCors": process.env.LARAVEL_ECHO_SERVER_ALLOW_CORS !== 'false',
        "allowOrigin": process.env.LARAVEL_ECHO_SERVER_ALLOW_ORIGIN || "*",
        "allowMethods": process.env.LARAVEL_ECHO_SERVER_ALLOW_METHODS || "GET, PUT, POST, DELETE, HEAD, OPTIONS",
        "allowHeaders": process.env.LARAVEL_ECHO_SERVER_ALLOW_HEADERS || "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
    },
    "allowCreationOfPrivateChannels": process.env.LARAVEL_ECHO_SERVER_ALLOW_PRIVATE_CHANNELS !== 'false'
};

echo.run(options);
