const userController = require("../controllers/usuario")
module.exports = (app) =>{
    app.get("/",(req,res)=>{
        res.send("Enviando");
    });

    app.get("/user/:id",userController.user);
    app.post("/register",userController.createUser);
    app.post("/login",userController.login);
    app.use("",userController.middleware);
    app.get("/users",userController.users);


};