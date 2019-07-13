const userController = require("../controllers/usuario")
module.exports = app =>{
    app.get("/",(req,res)=>{
        res.send("Enviando");
    });

    app.get("/users",userController.users);
    app.get("/user/:id",userController.user);
    app.post("/createUser",userController.createUser);


};