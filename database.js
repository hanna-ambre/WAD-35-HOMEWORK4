const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "adm1n",
    database: "HW4",
    host: "localhost",
    port: "5432"
});

const execute = async(query1, query2) => {
    try {
        await pool.connect();
        await pool.query(query1);
        await pool.query(query2);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createTblPosts = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        date timestamp default current_timestamp,
        body VARCHAR(200) NOT NULL
    );`;

execute(createTblQuery, createTblPosts).then(result => {
    if (result) {
        console.log('Table "posts" and table "users" has been created');
    }
});

module.exports = pool;