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

//Analize the body for JSON requests
app.use(express.json());

//Route to get all the admins
app.get("/admins", (req, res) => {
    pool.query("SELECT * FROM admins", (err, results) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            res.status(500).json({ error: "Error al obtener usuarios" });
        } else {
            res.json({ admins: results.rows });
        }
    });
});

//Route to get specific admin
app.get("/admin/:id", (req, res) => {
    const adminId = req.params.id;
    pool.query('SELECT * FROM admins WHERE admin_id = $1', [adminId], (err, results) => {
        if (err) {
            console.error('Error al obtener el admin:', err);
            res.status(500).json({ error: 'Error al obtener el admin' });
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json({ admin: results.rows[0] });
            }
        }
    });
});

//Route to create a new admin
app.post('/admin/new', (req, res) => {
    const newAdmin = req.body;
    pool.query('INSERT INTO admins (admin_id, admin_name) VALUES ($1, $2)', [newAdmin.admin_id, newAdmin.admin_name], (err, results) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
            res.json({ message: 'Usuario creado con exito', admin: newAdmin });
        }
    });
});

//Route to update an existing admin
app.put('/admin/mod/:id', (req, res) => {
    const adminId = req.params.id;
    const updatedAdmin = req.body;
    pool.query('UPDATE admins SET admin_name = $1 WHERE admin_id = $2', [updatedAdmin.admin_name, adminId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        } else {
            res.json({ message: 'Usuario actualizado con exito', admin: updatedAdmin });
        }
    });
});

//Route to delete an existing admin
app.delete('/admin/del/:id', (req, res) => {
    const AdminId = req.params.id;
    pool.query('DELETE FROM admins WHERE admin_id = $1', [AdminId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el admin:', err);
            res.status(500).json({ error: 'Error al eliminar el admin' });
        } else {
            res.json({ message: 'Admin eliminado con exito' });
        }
    });
});


//Route to the documentation
app.use("/api-docs", require("./js/api-docs"));


//Listener for start project port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
