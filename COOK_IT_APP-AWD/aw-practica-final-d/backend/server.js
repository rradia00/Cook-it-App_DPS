const exp = require('express');
const cors = require('cors');
const connectionDB = require('./config/connection');
var app = exp();

connectionDB();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

//redireccionamientos
app.use('/login', require('./routes/login'));
app.use('/:camarero/mesas', require('./routes/mesas'));
app.use('/:camarero/mesas/:mesa',  require('./routes/mesas'));
app.use('/platos', require('./routes/platos'));
app.use('/:camarero/comanda/:idPlato/:op', require('./routes/platos'));
app.use('/:camarero/comanda', require('./routes/comandas'));
app.use(`/platos/comanda`, require('./routes/comandas'));
app.use('/:camarero/liberar', require('./routes/liberarMesa'));
app.use('/ingredientes', require('./routes/compras'));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

/*const PORT = process.env.PORT || 3053;
app.listen(PORT, () => console.log("Puerto escuchado el 3053"));*/

app.listen(3053, function(){
    console.log("Puerto en el 3053, vayan pasando");
})