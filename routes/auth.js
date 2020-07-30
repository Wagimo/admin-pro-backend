/**
 * '/api/login'
 */
const { Router } = require('express');
const { loginusuario } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validarcampos');
const { check } = require('express-validator');


const router = Router();


router.post('/', [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'password es obligatorio').not().notEmpty(),
        validarcampos
    ],
    loginusuario);

module.exports = router;