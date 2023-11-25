const mongoose = require('mongoose');
const config = require("config");
const db = process.env.MONGODB_URI || config.get("mongoURI");
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a la base de datos exitosa');
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}

module.exports = connectDB;