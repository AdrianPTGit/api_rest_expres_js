// Importamos Express
const express = require('express');
const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());
/**
 * 🔥 Resumen:
   -- ✔ Middleware es una función intermedia que se ejecuta entre la solicitud y la respuesta.
   -- ✔ Se usa para analizar datos, autenticar usuarios, registrar logs y manejar errores.
   -- ✔ Puede ser incorporado, de terceros o personalizado.
   -- ✔ Es importante llamar a next() para que la ejecución continúe.
 */


// Base de datos simulada en memoria
const students = [
    { id: 1, name: 'Jorge', age: 20, enroll: true },
    { id: 2, name: 'Mariana', age: 30, enroll: false },
    { id: 3, name: 'Antonio', age: 25, enroll: false },
];

/****************************************** GET ********************************************* */

// Ruta raíz que devuelve un mensaje simple
app.get('/', (req, res) => {
    res.send('Node JS API');
});

// Obtener todos los estudiantes
app.get('/api/students', (req, res) => {
    res.send(students);
});

// Obtener un estudiante por ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    res.send(student);
});

/****************************************** POST ********************************************* */

// Agregar un nuevo estudiante
app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1, // Asigna un nuevo ID
        name: req.body.name, // Obtiene el nombre desde el cuerpo de la solicitud
        age: parseInt(req.body.age), // Convierte la edad a número entero
        enroll: Boolean(req.body.enroll) // Convierte el valor en booleano
    };
    students.push(student); // Agrega el nuevo estudiante a la lista
    res.send(student); // Retorna el estudiante agregado
});

/****************************************** DELETE ********************************************* */

// Eliminar un estudiante por ID
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');

    const index = students.indexOf(student);
    students.splice(index, 1); // Elimina el estudiante de la lista
    res.send(student); // Retorna el estudiante eliminado
});

// Definir el puerto en el que escucha la aplicación
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
