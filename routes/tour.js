const tourController = require("../controllers/tour");
module.exports=(app)=>{
    app.get("/",(req,res)=>{
        res.send("ENVIADO");
    })

    app.get("/tours",tourController.tours);
    app.get("/tour/:id", tourController.tour);
    app.get("/ciudad/:id", tourController.ciudad);

};