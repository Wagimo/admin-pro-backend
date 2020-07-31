const { response } = require("express");
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospitales = require('../models/hospital');

const getAll = async(req, resp = response) => {

    try {

        const param = req.params.busqueda;
        const regExp = new RegExp(param, 'i');

        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regExp }),
            Medico.find({ nombre: regExp }),
            Hospitales.find({ nombre: regExp })
        ]);

        return resp.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });
    } catch (error) {

        console.log(error);
        return resp.status(500).json({
            ok: true,
            msg: 'Error al retornar la busqueda de todas las colecciones!'
        });
    }


};

const getAllCollection = async(req, resp = response) => {

    try {

        const tabla = req.params.table || 'usuarios';
        const busqueda = req.params.busqueda || '*';
        const regExp = new RegExp(busqueda, 'i');
        let data = [];
        switch (tabla) {
            case "usuarios":
                console.log('xxxxx');
                data = await Usuario
                    .find({ nombre: regExp });
                break;
            case "medicos":
                data = await Medico.find({ nombre: regExp })
                    .populate("usuario", "nombre img")
                    .populate("hospital", "nombre img");
                break;
            case "hospitales":
                data = await Hospitales
                    .find({ nombre: regExp })
                    .populate("usuario", "nombre img");

                break;
            default:
                return resp.status(400).json({
                    ok: false,
                    msg: 'La tabla no corresponde con las colecciones de la BD!'
                });
        }

        resp.status(400).json({
            ok: true,
            resultado: data
        });


    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: true,
            msg: 'Error al retornar la lista de la coleccion!'
        });
    }
};


module.exports = {
    getAll,
    getAllCollection
};