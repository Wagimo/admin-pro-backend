/**
 * ruta: api/upload/
 */
const { Router } = require('express');

const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validarJWT');


const {
    actualizarImagen,
    retornaImagen
} = require('../controllers/upload');

const router = Router();

router.use(fileUpload());

router.put('/:collection/:id',
    validarJWT, actualizarImagen);

router.get('/:tipo/:foto',
    validarJWT, retornaImagen);

module.exports = router;