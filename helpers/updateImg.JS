const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospitales = require('../models/hospital');

const borrarImg = (oldPath) => {

    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }
};

const updateImgHelper = async(tipo, id, nombrearchivo) => {

    switch (tipo) {

        case "medicos":
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("Medico no encontrado!");
                return false;
            }

            let oldPath = `./uploads/medicos/${medico.img}`;
            borrarImg(oldPath);

            medico.img = nombrearchivo;
            await medico.save();
            return true;

        case "usuarios":

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("Usuario no encontrado!");
                return false;
            }

            const oldPathUser = `./uploads/usuarios/${usuario.img}`;
            borrarImg(oldPathUser);

            usuario.img = nombrearchivo;
            await usuario.save();
            return true;

        case "hospitales":
            const hospital = await Hospitales.findById(id);
            if (!hospital) {
                console.log("Hospital no encontrado!");
                return false;
            }

            const oldPathHosp = `./uploads/hospitales/${hospital.img}`;
            borrarImg(oldPathHosp);

            hospital.img = nombrearchivo;
            await hospital.save();
            return true;

    }


};

module.exports = {
    updateImgHelper
};