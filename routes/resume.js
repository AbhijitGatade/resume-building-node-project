var express = require("express");
var bodyparser = require("body-parser");
const Resume = require("../models/Resume");
var fs = require("fs");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let resume = new Resume();
    if(body.data.id != ""){
        resume = await Resume.findById(body.data.id);
    }
    resume.userid = body.data.userid;
    resume.name = body.data.name;
    resume.template = body.data.template;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let body = req.body;
    let resumes = await Resume.find({userid:body.data.userid});
    res.json({data:resumes});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let resumes = await Resume.findById(body.data.id);
    res.json({data:resumes});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Resume.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});

router.post("/updatebasic", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    resume.basic = body.data;
    
    let base64image = body.data.image;
    if(base64image != "")
    {
        let randomname = (Math.random() + 1).toString(36).substring(7);         
        base64image = base64image.replace(/^data:image\/[a-z]*;base64,/, "");  
        resume.basic["imagepath"] = "resumepics/" + randomname + ".png";
        fs.writeFile("assets/" + resume.basic["imagepath"], base64image, 'base64', function(err){
            if(err)
                console.log("Error while saving image " + err);
        });
    }
    
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/updateeducation", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    resume.education.push(body.data);
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/deleteeducation", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    let educations = new Array();
    for(let i = 0; i < resume.education.length; i++)
    {
        if(resume.education[i].year != body.data.year && resume.education[i].college != body.data.college)
            educations.push(resume.education[i]);
    }
    resume.education = educations;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/updateskills", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    resume.skill = body.data.skills;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/updatehobbies", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    resume.hobby = body.data.hobbies;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/updateindividualskills", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    resume.individualskill = body.data.individualskills;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/updatelanguages", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    resume.language = body.data.languages;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});



router.post("/updateexperience", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    if(body.data.expid != ""){
        for(let i = 0; i < resume.experience.length; i++)
        {
            if(resume.experience[i].expid == body.data.expid){
                resume.experience[i]["company"] = body.data.company;
                resume.experience[i]["position"] = body.data.position;
                resume.experience[i]["duration"] = body.data.duration;
                resume.experience[i]["description"] = body.data.description;
            }
        }
    }
    else{
        body.data.expid = (Math.random() + 1).toString(36).substring(7);
        resume.experience.push(body.data);
    }
    let array = resume.experience;    
    resume = await Resume.findById(body.data.id);
    resume.experience = array;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/deleteexperience", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    let experiences = new Array();
    for(let i = 0; i < resume.experience.length; i++)
    {
        if(resume.experience[i].expid != body.data.expid)
        experiences.push(resume.experience[i]);
    }
    resume.experience = experiences;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/updateproject", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    if(body.data.proid != ""){
        for(let i = 0; i < resume.project.length; i++)
        {
            if(resume.project[i].proid == body.data.proid){
                resume.project[i]["name"] = body.data.name;
                resume.project[i]["technology"] = body.data.technology;

                resume.project[i]["description"] = body.data.description;
            }
        }
    }
    else{
        body.data.proid = (Math.random() + 1).toString(36).substring(7);
        resume.project.push(body.data);
    }
    let array = resume.project;    
    resume = await Resume.findById(body.data.id);
    resume.project = array;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/deleteproject", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    let projects = new Array();
    for(let i = 0; i < resume.project.length; i++)
    {
        if(resume.project[i].proid != body.data.proid)
        projects.push(resume.project[i]);
    }
    resume.project = projects;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});



router.post("/updateactivity", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    if(body.data.actid != ""){
        for(let i = 0; i < resume.activity.length; i++)
        {
            if(resume.activity[i].actid == body.data.actid){
                resume.activity[i]["name"] = body.data.name;            
            }
        }
    }
    else{
        body.data.actid = (Math.random() + 1).toString(36).substring(7);
        resume.activity.push(body.data);
    }
    let array = resume.activity;    
    resume = await Resume.findById(body.data.id);
    resume.activity = array;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        console.log(err);
        res.end(JSON.stringify(err));
    });
});

router.post("/deleteactivity", async(req, res)=>{
    let body = req.body;
    let resume = await Resume.findById(body.data.id);
    let activities = new Array();
    for(let i = 0; i < resume.activity.length; i++)
    {
        if(resume.activity[i].actid != body.data.actid)
        projects.push(resume.activity[i]);
    }
    resume.activity = activities;
    resume.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

module.exports = router;