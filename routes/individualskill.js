var express = require("express");
var bodyparser = require("body-parser");
const Individualskill = require("../models/Individualskill");

var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let individualskill = new Individualskill();
    if(body.data.id != ""){
        skill = await Individualskill.findById(body.data.id);
    }
    individualskill.title = body.data.title;
    individualskill.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let individualskills = await Individualskill.find();
    res.json({data:individualskills});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let individualskills = await Individualskill.findById(body.data.id);
    res.json({data:individualskills});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Individualskill.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;