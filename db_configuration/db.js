const { Pool, Client } = require("pg");
const credentials = {
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
};
exports.pool = new Pool(credentials);