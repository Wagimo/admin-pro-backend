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

const actualizarMedico = (req, resp = response) => {

    return resp.status(200).json({
        ok: true,
        msg: 'Medico OK'
    });

};

const eliminarMedico = (req, resp = response) => {

    return resp.status(200).json({
        ok: true,
        msg: 'Medico OK'
    });

};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};