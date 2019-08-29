const express = require("express");
const bodyParser=require("body-parser"); //middleware json
const conexion = require("./db/connection");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors(
    {
        application:{
            cors:{
                server:[
                    {
                        origin:"localhost:3000",
                        credentials:true
                    }
                ]
            }
        }
    }
))

app.listen(5000, ()=>{
    console.log("Servidor corriendo en el puerto 5000");
})


const routeTours = require("./routes/tour")(app);
const routeUsers = require("./routes/usuario")(app);

conexion.connect();