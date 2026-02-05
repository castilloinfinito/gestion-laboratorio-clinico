// seccion de declaracion de variables.
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Importamos la versión 4 de UUID

const dataPath = path.join(__dirname, '../data/data.json');

class LabController {
    // ... métodos _read y _write se mantienen igual ...
    _read() {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }

    _write(data) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }

    // LISTAR: Ahora los IDs serán strings largos (UUID)
    listar = (req, res) => {
        const { entidad } = req.params;
        const { id, orden } = req.query;
        let data = this._read();
        let items = data[entidad] || [];

        if (id) items = items.filter(i => i.id === id);

        // Si se pide el top 5, ordenamos por inserción (UUID no es numérico, usamos el orden del array)
        if (orden === 'recent') {
            items = items.slice(-5).reverse();
        }

        res.render('index', { entidad, items, todosLosDatos: data });
    }

    // CREAR: Aquí insertamos el UUID
    agregar = (req, res) => {
        const { entidad } = req.params;
        const db = this._read();
        
        const nuevoElemento = { 
            id: uuidv4(), // Genera un ID tipo: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
            ...req.body,
            creadoEn: new Date().toISOString() // Recomendado para ordenar cronológicamente
        };
        
        db[entidad].push(nuevoElemento);
        this._write(db);
        res.redirect(`/gestion/${entidad}`);
    }

    // ... eliminar y actualizar usan el ID como String ...
    eliminar = (req, res) => {
        const { entidad, id } = req.params;
        const db = this._read();

        db[entidad] = db[entidad].filter(i => i.id !== id);

        if (entidad === 'pacientes') {
            db.resultados = db.resultados.filter(r => r.pacienteId !== id);
        }

        this._write(db);
        res.redirect(`/gestion/${entidad}`);
    }
}

module.exports = new LabController();