const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {


    //obtener token desde el header
    const token = req.header('x-token');

    if (!token) {
        res.status(404).json({
            ok: false,
            msg: 'Error al obtener el token.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();


    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }

};

module.exports = {
    validarJWT
};