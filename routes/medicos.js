/**
 * '/api/medicos'
 */


const { Router } = require('express');
const { check } = require('express-validator');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicos');

const { validarcampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'Nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'Hospital es obligatorio y válido!').isMongoId(), //validacion del ID de mongo para que sea correcto.
        validarcampos
    ],
    crearMedico);


router.put('/:id', [

    ],
    actualizarMedico);

router.delete('/:id',
    // validarJWT,
    eliminarMedico);


module.exports = router;