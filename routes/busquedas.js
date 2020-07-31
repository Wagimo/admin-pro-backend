/**
 * ruta: api/all/:busqueda
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarJWT');


const {
    getAll,
    getAllCollection
} = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda',
    validarJWT, getAll);

router.get('/collection/:table/:busqueda',
    validarJWT, getAllCollection);

module.exports = router;