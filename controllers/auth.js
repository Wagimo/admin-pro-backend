const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const loginusuario = async(req, resp = response) => {

    try {

        const { email, password } = req.body;

        if (email == null) {

            return resp.status(404)
                .json({
                    ok: false,
                    msg: 'Email o contraseña incorrecto!'
                });
        }

        const usuarioDb = await Usuario.findOne({ email });
        if (!usuarioDb) {
            return resp.status(404)
                .json({
                    ok: false,
                    msg: 'Email o contraseña incorrecto!'
                });
        }

        //VERIFICAR CONTRASEÑA
        const validPassword = await bcrypt.compareSync(password, usuarioDb.password);
        if (!validPassword) {
            return resp.status(400)
                .json({
                    ok: false,
                    msg: 'Email o contraseña incorrecto!'
                });
        }

        //GENERAR TOKEN

        const token = await generarToken(usuarioDb.id);




        resp.json({
            ok: true,
            msg: token
        });

    } catch (err) {
        console.log(err);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revise la consola'
        });
    }

};


module.exports = {
    loginusuario
};