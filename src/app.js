
//Imports
const express = require("express");
const app = express();
const port = 3000;
const { Pool } = require("pg");

//POSTGRE Connection
const pool = new Pool({
    host: "localhost",
    user: "superuser",
    password: "12345",
    database: "3x3_inside",
    port: 5432,
});

const swaggerDocs = require('./routes/api/api-docs');

//Analize the body for JSON requests
app.use(express.json());
app.use('/docs', swaggerDocs);

//Routes access
require('./routes/adminRoutes')(app, pool);

//Listener for start project port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
