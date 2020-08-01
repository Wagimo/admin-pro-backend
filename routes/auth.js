/**
 * '/api/login'
 */
const { Router } = require('express');
const { loginusuario, googleSingIn } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validarcampos');
const { check } = require('express-validator');


const router = Router();


router.post('/', [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'password es obligatorio').not().notEmpty(),
        validarcampos
    ],
    loginusuario);

router.post('/google', [
        check('token', 'Token google es obligatorio').not().notEmpty(),
        validarcampos
    ],
    googleSingIn);

module.exports = router;