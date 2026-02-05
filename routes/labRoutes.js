const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');

// Operaciones CRUD
router.get('/:entidad', (req, res) => labController.listar(req, res));
router.post('/:entidad', (req, res) => labController.crear(req, res));
router.put('/:entidad/update/:id', (req, res) => labController.actualizar(req, res));
router.get('/:entidad/delete/:id', (req, res) => labController.eliminar(req, res));

module.exports = router;