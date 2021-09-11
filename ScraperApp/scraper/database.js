const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "Yourpassword",
    host: "localhost",
    port: 5432,
    database: "Yourdatabase"
});

module.exports = pool;