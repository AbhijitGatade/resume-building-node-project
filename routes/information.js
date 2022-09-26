var express = require("express");
var bodyparser = require("body-parser");
const Information = require("../models/Information");

var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let information = new Information();
    if(body.data.id != ""){
        information = await Information.findById(body.data.id);
    }
    information.name = body.data.name;
    information.profile = body.data.profile;
    information.objective = body.data.objective;

    information.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let informations = await Information.find();
    res.json({data:informations});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let informations = await Information.findById(body.data.id);
    res.json({data:informations});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Information.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;