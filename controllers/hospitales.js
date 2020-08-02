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

const actualizarHospital = async(req, resp = response) => {

    const id = req.params.id; // id del hospital enviado en la ruta
    const uid = req.uid; //Id del usuario que paso por la validacion del token

    try {

        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return resp.status(404).json({
                ok: false,
                msg: 'Hospitales no encontrado para actualización'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalUpdate = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        return resp.json({
            ok: true,
            hospitalUpdate
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

const eliminarHospital = async(req, resp = response) => {

    const id = req.params.id; // id del hospital enviado en la ruta

    try {

        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return resp.status(404).json({
                ok: false,
                msg: 'Hospitales no encontrado para actualización'
            });
        }
        await Hospital.findByIdAndDelete(id);

        return resp.json({
            ok: true,
            msg: "Hospital Eliminado Satisfactoriamente!"
        });

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
};