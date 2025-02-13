// Importamos las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database');


// Middleware para parsear JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta para obtener los cursos
app.get('/cursos', (req, res) => {
    
    db.query('SELECT * FROM cursos', (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error obteniendo cursos');
            return;
        }
       
        res.json(results);
    });
});

// Ruta para obtener los centros
app.get('/centros', (req, res) => {
    db.query('SELECT * FROM centros', (err, results) => {
        if (err) {
            res.status(500).send('Error obteniendo centros');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener alumnos de un curso específico
app.get('/cursos/:id/alumnos', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM alumnoscursos JOIN alumnos ON alumnoscursos.idAlumno = alumnos.idAlumno WHERE idCurso = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error obteniendo alumnos');
            return;
        }
        res.json(results);
    });
});

// Ruta para eliminar un alumno
app.delete('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM alumnos WHERE idAlumno = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error eliminando alumno');
            return;
        }
        res.send({ message: 'Alumno eliminado' });
    });
});

// Ruta para mostrar estadísticas gráficas del ratio de aprobados
app.get('/estadisticas', (req, res) => {
    db.query('SELECT cursos.nombre, COUNT(CASE WHEN alumnoscursos.estado = "aprobado" THEN 1 END) AS aprobados, COUNT(*) AS total FROM cursos LEFT JOIN alumnoscursos ON cursos.idCurso = alumnoscursos.idCurso GROUP BY cursos.idCurso', (err, results) => {
        if (err) {
            res.status(500).send('Error obteniendo estadísticas');
            return;
        }
        res.json(results);
    });
});

// Ruta para modificar la información de un curso
app.put('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, fechaImportacion, nivel, descripcion, lugar } = req.body;
    db.query('UPDATE cursos SET nombre = ?, fechaImportacion = ?, nivel = ?, descripcion = ?, lugar = ? WHERE idCurso = ?', [nombre, fechaImportacion, nivel, descripcion, lugar, id], (err, result) => {
        if (err) {
            res.status(500).send('Error actualizando curso');
            return;
        }
        res.send({ message: 'Curso actualizado correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

