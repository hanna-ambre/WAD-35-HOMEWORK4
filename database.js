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
        await pool.connect(); // create a connection
        await pool.query(query1); // executes 1. query
        await pool.query(query2); // executes 2. query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

/* 
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
An example of generated uuid:  32165102-4866-4d2d-b90c-7a2fddbb6bc8
*/

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createTblPosts = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        date DATE,
        body VARCHAR(200) NOT NULL
    );`;

execute(createTblQuery, createTblPosts).then(result => {
    if (result) {
        console.log('Table "posts" and table "users" has been created');
    }
});

module.exports = pool;