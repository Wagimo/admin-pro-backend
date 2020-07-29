const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("bd online");
    } catch (err) {
        console.error(err);
        throw new Error("Error al iniciar la BD!");
    }

}

module.exports = {
    dbConnection
}