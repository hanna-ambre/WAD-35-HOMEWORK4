const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "webdev",
    database: "backend",
    host: "localhost",
    port: "5432"
});

module.exports = pool;