const { response } = require("express");

const { v4: uuidv4 } = require('uuid');
const { updateImgHelper } = require("../helpers/updateImg");
const { compareSync } = require("bcryptjs");
const path = require('path');
const fs = require('fs');
const actualizarImagen = async(req, resp = response) => {

    try {


        const { id, collection } = req.params;

        const tipos = ['hospitales', 'medicos', 'usuarios'];
        if (!tipos.includes(collection)) {
            return resp.status(400).json({
                ok: false,
                msg: `El nombre [${collection}] es incorrecto(a)!`
            });
        }

        //se valida que exista un archivo en el request
        if (!req.files || Object.keys(req.files).length === 0) {
            return resp.status(400).json({
                ok: false,
                msg: `No hay archivos para subir al servidor!!`
            });
        }

        const file = req.files.imagen;

        const nameFile = file.name.split('.');

        const extension = nameFile[nameFile.length - 1];

        const tiposArchivo = ["png", "jpg", "gif", "jpeg"];
        if (!tiposArchivo.includes(extension)) {
            return resp.status(400).json({
                ok: false,
                msg: `La extensión del archivo [.${extension}] no está permitida!!`
            });
        }

        const newName = `${uuidv4()}.${extension}`;

        //path para guardar la imagen
        const path = `./uploads/${collection}/${newName}`;

        file.mv(path, (e) => {
            if (e) {
                console.log(e);
                return resp.status(500).json({
                    ok: false,
                    msg: `Error al mover el archivo al directorio ${collection}`
                });
            }


        });


        //actualizar BD
        updateImgHelper(collection, id, newName);

        return resp.json({
            ok: true,
            msg: "upload!",
            newName
        });


    } catch (error) {

        console.log(error);
        return resp.status(500).json({
            ok: true,
            msg: 'Error al actualizar la imagen !'
        });
    }


};

const retornaImagen = async(req, resp = response) => {

    const { tipo, foto } = req.params;
    const oPathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);


    if (fs.existsSync(oPathImg)) {
        resp.sendfile(oPathImg);
    } else {
        const ImgDef = path.join(__dirname, `../uploads/no-img.jpg`);
        resp.sendfile(ImgDef);
    }

};

module.exports = {
    actualizarImagen,
    retornaImagen
};