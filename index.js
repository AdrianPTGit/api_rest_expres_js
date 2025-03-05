const express = require('express');
const app = express();

app.use(express.json());

const students = [
    { id: 1, name: 'Jorge', age: 20, enroll: true },
    { id: 2, name: 'Mariana', age: 30, enroll: false },
    { id: 3, name: 'Antonio', age: 25, enroll: false },
];

/******************************************GET********************************************* */
app.get('/', (req, res) => {
    res.send('Node JS API');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    res.send(student);
});

/******************************************POST********************************************* */
app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: Boolean(req.body.enroll) // Convierte cualquier valor en booleano correctamente
    };
    students.push(student);
    res.send(student);
});

/******************************************DELETE********************************************* */
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');

    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

// PUERTO DE ESCUCHA
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
