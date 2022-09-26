const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        userid:{
            type:String,
        },
        name:{
            type:String,
        },
        template:{
            type:String,
        },
        basic:{
            type:Object
        },
        education:{
            type:Array
        },
        skill:{
            type:Array
        },
        hobby:{
            type:Array
        },
        individualskill:{
            type:Array
        },
        language:{
            type:Array
        },
        experience:{
            type:Array
        },
        project:{
            type:Array
        },
        activity:{
            type:Array
        }
    }
);
const Resume = mongoose.model("resumes", schema);
module.exports = Resume;