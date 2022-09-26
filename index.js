var express = require("express");
var bodyparser = require("body-parser");
const mongoose = require("mongoose");

var app = express();

app.use(express.static("assets"));

app.use(bodyparser.json({limit:'5000mb'}));
app.use(bodyparser.urlencoded({limit:'5000mb', extended: true}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/igapresume");
const db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get("/", function(req, res){
    res.send("Hello Welcome to Resume Building");
    res.end();
});

app.use("/user",require("./routes/user"));
app.use("/hobby",require("./routes/hobby"));
app.use("/skill",require("./routes/skill"));
app.use("/language",require("./routes/language"));
app.use("/qualification",require("./routes/qualification"));
app.use("/language",require("./routes/language"));
app.use("/objective",require("./routes/objective"));
app.use("/individualskill",require("./routes/individualskill"));
app.use("/resume",require("./routes/resume"));
app.use("/information",require("./routes/information"));










app.listen(8081, function(){
    console.log("Node Server Started");
})