const { Client }=require('pg');
const connection ={
    user: 'postgres',
    host:'localhost',
    database:'bdtripcost',
    password:'clsestudiante',
    port:5432
}
const client= new Client(connection);


client.connect((error)=>{
    if(error){
        console.log("Error en conexión: "+error.stack);
        return;
    }
    console.log("¡Conexión lista!");
});

module.exports = client;