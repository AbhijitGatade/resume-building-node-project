var express = require("express");
var bodyparser = require("body-parser");
const Language = require("../models/Language");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let language = new Language();
    if(body.data.id != ""){
        language = await Language.findById(body.data.id);
    }
    language.title = body.data.title;
    language.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let languages = await Language.find();
    res.json({data:languages});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let languages = await Language.findById(body.data.id);
    res.json({data:languages});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Language.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;