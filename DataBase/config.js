const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        // await mongoose.connect(process.env.BD_CONN_LOCAL, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        await mongoose.connect('mongodb://localhost/mongoose_basics');
        console.log("bd online");
    } catch (err) {
        console.error(err);
        throw new Error("Error al iniciar la BD!");
    }

}

module.exports = {
    dbConnection
}