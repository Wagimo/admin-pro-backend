const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async(req, resp = response) => {

    try {

        const hospitales = await Hospital.find()
            .populate('usuario', 'nombre img');

        return resp.status(200).json({
            ok: true,
            hospitales
        });
    } catch (error) {

        return resp.status(500).json({
            ok: true,
            msg: 'Error al retornar la lista de hospitales!'
        });
    }


};

const crearHospital = async(req, resp = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDb = await hospital.save();
        return resp.json({
            ok: true,
            msg: hospitalDb
        });

    } catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: 'Error inesperado.'
        });
    }
};

const actualizarHospital = (req, resp = response) => {

    return resp.status(200).json({
        ok: true,
        msg: 'Hospitales OK'
    });

};

const eliminarHospital = (req, resp = response) => {

    return resp.status(200).json({
        ok: true,
        msg: 'Hospitales OK'
    });

};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
};