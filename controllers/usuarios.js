const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const getUsuarios = async(req, resp) => {
    // resp.status(400).json({ ok: true, msg: 'listo' });
    const usuarios = await Usuario.find({}, 'nombre email role google');

    resp.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
};

const crearUsuario = async(req, resp = response) => {

    const { email, password, nombre } = req.body;

    try {


        // let result = await Usuario.findOne({ email: email });
        let result = await Usuario.findOne({ email });

        if (result) {
            return resp.status(400)
                .json({
                    ok: false,
                    msg: 'El correo ingresado ya se encuentra registrado!'
                });
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarToken(usuario.id);


        resp.json({
            ok: true,
            token,
            usuario
        });

    } catch (err) {
        console.log(err);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revise la consola'
        });
    }



};

const actualizarusuario = async(req, resp = response) => {

    try {

        const uid = req.params.id;

        const existUser = await Usuario.findById(uid);
        if (!existUser) {
            return resp.status(404)
                .json({
                    ok: false,
                    msg: 'Usuario no encontrado en la BD!'
                });
        }

        //TODO: desestructuramos le informacion de los campos que llegan en el body y excluimos
        //el password, google y email de la lista de campos.          
        const { password, google, email, ...campos } = req.body;

        if (existUser.email !== email) {

            const existemail = await Usuario.findOne({ email });
            if (existemail) {
                return resp.status(400)
                    .json({
                        ok: false,
                        msg: 'El email ya se encuentra registrado!'
                    });
            }

        }
        // delete campos.password; //eliminando campos innecesarios en la actualización
        // delete campos.google;

        campos.email = email;
        //{new:true} sirve para retornar el registro modificado al cliente
        const usuario = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        resp.json({
            ok: true,
            msg: usuario
        });

    } catch (err) {
        console.log(err);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revise la consola'
        });
    }



};

const eliminarusuario = async(req, resp = response) => {

    try {

        const uid = req.params.id;

        const existUser = await Usuario.findById(uid);

        if (!existUser) {
            return resp.status(404)
                .json({
                    ok: false,
                    msg: 'Usuario no encontrado en la BD!'
                });
        }

        await Usuario.findByIdAndDelete(uid);

        resp.json({
            ok: true,
            msg: "Usuario elimindo"
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
    getUsuarios,
    crearUsuario,
    actualizarusuario,
    eliminarusuario
};