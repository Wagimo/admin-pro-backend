const { response } = require("express");
const Medico = require('../models/medico');


const getMedicos = async(req, resp = response) => {

    try {

        const medicos = await Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        return resp.json({
            ok: true,
            medicos
        });

    } catch (error) {

        return resp.status(500).json({
            ok: false,
            msg: 'Error inesperado al obtener la lista de  medicos!'
        });
    }

};

const crearMedico = async(req, resp = response) => {

    try {


        const medico = new Medico({
            usuario: req.uid,
            ...req.body
        });

        const medicoDb = await medico.save();

        return resp.json({
            ok: true,
            medico: medicoDb
        });
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear el medico!'
        });
    }


};

const actualizarMedico = async(req, resp = response) => {

    const id = req.params.id; // id del hospital enviado en la ruta
    const uid = req.uid;

    try {

        const existUser = await Medico.findById(id);
        if (!existUser) {
            return resp.status(404)
                .json({
                    ok: false,
                    msg: 'Medico no encontrado en la BD!'
                });
        }

        const datosUpdate = {
            ...req.body,
            usuario: uid
        };

        const hu = await Medico.findByIdAndUpdate(id, datosUpdate, { new: true });

        return resp.status(200).json({
            ok: true,
            hu
        });

    } catch (error) {
        console.log(error);
        return resp.status(500)
            .json({
                ok: false,
                msg: 'Error inesperado'
            });
    }

};

const eliminarMedico = async(req, resp = response) => {

    const id = req.params.id;

    try {

        const medicoBd = await Medico.findById(id);
        if (!medicoBd) {
            return req.status(400).json({
                ok: false,
                msg: "Medico no encontrado en la BD!"
            });
        }

        await Medico.findByIdAndDelete(id);

        return resp.status(200).json({
            ok: true,
            msg: 'Medico Eliminado satisfactoriamente!'
        });

    } catch (error) {

        console.log(error);
        return req.status(500).json({
            ok: false,
            msg: "Error inesperado!"
        });
    }

};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};