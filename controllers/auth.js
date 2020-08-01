const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');
const { verifyGoogle } = require('../helpers/googleVerify');
const { v4: uuidv4 } = require('uuid');
const usuarios = require('./usuarios');

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

const googleSingIn = async(req, resp = response) => {

    const googleToken = req.body.token;

    try {


        const { name, email, picture } = await verifyGoogle(googleToken);

        const usuarioDb = await Usuario.findOne({ email });

        let usuario;

        if (!usuarioDb) {

            usuario = new Usuario({
                email,
                nombre: name,
                img: picture,
                google: true,
                password: uuidv4()
            });

        } else {
            //existe
            usuario = usuarioDb;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarToken(usuarioDb.id);

        return resp
            .json({
                ok: true,
                token
            });

    } catch (error) {

        console.log(error);
        return resp
            .status(500)
            .json({
                ok: false,
                msg: 'Error inesperado!'
            });
    }


};

module.exports = {
    loginusuario,
    googleSingIn
};