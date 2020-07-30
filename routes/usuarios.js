/**
 * ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarusuario, eliminarusuario } = require('../controllers/usuarios');
const { validarcampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
        check('nombre', 'Nombre es obligatorio').not().notEmpty(),
        check('password', 'password es obligatorio').not().notEmpty(),
        check('email', 'email es obligatorio').isEmail(),
        validarcampos
    ],
    crearUsuario);


router.put('/:id', [
        validarJWT,
        check('nombre', 'Nombre es obligatorio').not().notEmpty(),
        check('role', 'role es obligatorio').not().notEmpty(),
        check('email', 'email es obligatorio').not().notEmpty(),
        validarcampos
    ],
    actualizarusuario);

router.delete('/:id',
    validarJWT,
    eliminarusuario);


module.exports = router;