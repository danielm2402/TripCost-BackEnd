const db = require("../db/connection");
module.exports={
    tours: (req, res)=>{
        console.log("obteniendo tours");

        db.query("SELECT * FROM TOUR;",(error,result,field)=>{
            if(error){
                res.status(502).send(error);
            }
            res.send(result['rows']);
        });
    },

    tour:(req, res)=>{
        const{ id } = req.params
        console.log("obteniendo tour");
        db.query("SELECT * FROM TOUR WHERE tid="+id,(error,result,field)=>{
            if(error){
                res.status(502).send(error)
            }
            res.send(result['rows']);

        });
    }

}
