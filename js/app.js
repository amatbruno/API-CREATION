const express = require("express");
const app = express();
const port = 3000;
const { Pool } = require("pg");

//POSTGRE connection
const pool = new Pool({
    host: "localhost",
    user: "superuser",
    password: "12345",
    database: "3x3_inside",
    port: 5432,
});

app.use(express.json());

//Route to get all the admins
app.get("/admins", (req, res) => {
    pool.query("SELECT * FROM admins", (err, results) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            res.status(500).json({ error: "Error al obtener usuarios" });
        } else {
            res.json({ users: results.rows });
        }
    });
});

//Route to get specific admin
app.get("/admin/:id", (req, res) => {
    const adminId = req.params.id;
    pool.query('SELECT * FROM admins WHERE admin_id = $1', [adminId], (err, results) => {
        if (err) {
            console.error('Error al obtener el admin:', err);
            res.status(500).json({ error: 'Error al obtener el admin'});
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json({ admin: results.rows[0]});
            }
        }
    });
});





//Listener for start project port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
