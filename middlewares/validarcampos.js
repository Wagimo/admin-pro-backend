const { response } = require('express');
const { validationResult } = require('express-validator');



const validarcampos = (req, resp = response, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return resp.status(400)
            .json({
                ok: false,
                msg: errores.mapped()
            });
    }

    next();
};

module.exports = { validarcampos };