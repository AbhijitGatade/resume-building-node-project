const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        title:{
            type:String,
            required: true
        }
    }
);
const Individualskill = mongoose.model("individualskills", schema);
module.exports = Individualskill;