const db = require("../db/connection");
const evalidator = require("email-validator");


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
                    res.status(502).send("email ya pertenece a otro usuario");
                } else {
                    console.log("INSERT INTO USUARIO(UNOMBRE, UAPELLIDO, UCORREO, UCONTRASENA, UMETODO) VALUES($1,$2,$3,$4,$5)",
                    [nombre, apellido, correo, contrasena, 'MD5'])
                    db.query("INSERT INTO USUARIO(UNOMBRE, UAPELLIDO, UCORREO, UCONTRASENA, UMETODO) VALUES($1,$2,$3,$4,$5)",
                        [nombre, apellido, correo, contrasena, 'MD5'], (error, result, fields) => {
                            if (error) {
                                res.status(502).send(error);
                            }
                            res.send(result);

                        });

                }

            })

        }
    }



}