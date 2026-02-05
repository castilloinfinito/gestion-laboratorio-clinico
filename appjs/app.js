// definicion de constantes. 
const express = require('express');
const path = require('path');
const labRoutes = require('./routes/labRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/gestion', labRoutes);

app.get('/', (req, res) => res.redirect('/gestion/pacientes'));



const PORT = process.env.PORT || 3000;

// . Escuchamos en el puerto dinámico
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});