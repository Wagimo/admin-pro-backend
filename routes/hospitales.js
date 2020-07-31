/**
 * '/api/hospitales'
 */


const { Router } = require('express');
const { check } = require('express-validator');
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
} = require('../controllers/hospitales');

const { validarcampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', getHospitales);

router.post('/', [
        validarJWT,
        check('nombre', 'Nombre hospital es obligatrio!').not().isEmpty(),
        validarcampos
    ],
    crearHospital);


router.put('/:id', [
        validarJWT
    ],
    actualizarHospital);

router.delete('/:id',
    validarJWT,
    eliminarHospital);


module.exports = router;