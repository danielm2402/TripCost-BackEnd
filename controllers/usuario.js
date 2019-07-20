const db = require("../db/connection");
const evalidator = require("email-validator");
const md5=require("md5");
const jwt = require("jsonwebtoken");


module.exports = {
    users: (req, res) => {
        console.log("obteniendo usuarios");
        db.query("SELECT * FROM USUARIO", (error, result, fields) => {
            if (error) {
                res.status(502).send(error);
            }
            res.send(result);
        });
    },
    user: (req, res) => {
        console.log("obteniendo usuario");
        const {
            id
        } = req.params;
        db.query("SELECT * FROM USUARIO WHERE UID=" + id, (error, result, fields) => {
            if (error) {
                res.status(502).send(error);
            }
            res.send(result);
        });
    },
    createUser: (req, res) => {
        console.log("Creando usuario..");
        const {
            nombre,
            apellido,
            correo,
            contrasena
        } = req.body;
        if (evalidator.validate(correo)) {
            db.query("SELECT * FROM USUARIO WHERE UCORREO=" + "'" + correo + "'", (error, result, fields) => {
                if (error) {
                    res.status(502).send(error);
                }
                if (result['rowCount'] > 0) {
                    res.status(502).send("Este Email Ya está registrado");
                } else {
                    console.log("INSERT INTO USUARIO(UNOMBRE, UAPELLIDO, UCORREO, UCONTRASENA, UMETODO) VALUES($1,$2,$3,$4,$5)",
                    [nombre, apellido, correo, 'MD5'+'('+contrasena+')','MD5'])
                    db.query("INSERT INTO USUARIO(UNOMBRE, UAPELLIDO, UCORREO, UCONTRASENA, UMETODO) VALUES($1,$2,$3,MD5($4),$5)",
                        [nombre, apellido, correo,contrasena,'MD5'], (error, result, fields) => {
                            if (error) {
                                res.status(502).send(error);
                            }
                            res.send(result);

                        });

                }

            })

        }
    },

    login: (req, res)=>{
        const {
            correo,
            contrasena
        } = req.body;

        if(evalidator.validate(correo)){
            console.log("SELECT * FROM USUARIO WHERE ucorreo="+"'"+ correo+"'"+" and ucontrasena="+"'"+md5(contrasena)+"'");
            db.query("SELECT * FROM USUARIO WHERE ucorreo="+"'"+ correo+"'"+" and ucontrasena="+"'"+md5(contrasena)+"'", (error, result, field)=>{
                if(error){
                    res.status(502).send(error);
                }
                if(result['rowCount'] > 0){
                    const token = jwt.sign(correo, 'tripcost')
                    res.json({
                        success: true,
                        message: 'token generado',
                        token,
                        result
                    })
                }
                else{
                    res.send("Email o Contraseña incorrecta");
                }
                    
            } )
        }
    },

    middleware:((req, res, next)=>{
        const token=req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            jwt.verify(token, 'tripcost', (error, decoded)=>{
                if(error){
                    return res.json({
                        sucess: false,
                        message: 'autentificacion fallida'
                    });
                } else{
                    req.decoded=decoded;
                    next();
                }
            })
        } else{
            return res.status(403).send({
                success: false,
                message: 'no existe el token'
            })
        }
    })



}