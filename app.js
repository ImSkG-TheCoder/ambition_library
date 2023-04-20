// installed and importing all library using require

const express = require("express");
const app = express();
const bodyParser = express("body-parser");
const mongoose = require("mongoose");

// express using all library 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("Public"));


//mongoose settings 
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB",{ useNewUrlParser: true }, { useUnifiedTopology: true },{ useUnifiedTopology: true 
});



//Creating mongoose table schema
const librarySchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    Email:String,
    phoneNumber:String,
    aadharNumber:String,
    shift:String
});

//creating mongoose table

const libraryModel = mongoose.model("libraryModel",librarySchema);

//getting on main page.

app.get("/",function(req,res){
    res.render("main",{
        name:"Shashikant"
    });
});


//post button to go on to fill the form

app.post("/seat",function(req,res){
    if (req.body.button ==="seat"){
        res.render("posting");
    }
});

// for fillling all details

app.post("/bookMySeat",function(req,res){
    
    const slot = req.body.slot;
    const name = req.body.firstName +" "+req.body.lastName;
    const email = (req.body.email).toLowerCase();
    const phonenumber = req.body.phoneNumber;
    libraryModel.findOne({ Email: email }, {Email:1},function(err,result){
    if (result){
        res.render("emailCheck",{
            email:email,
            name:name
        });
    }else{
    if (slot!="1"){
        const creatNew = new libraryModel({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            Email:email,
            phoneNumber:phonenumber,
            shift:slot,
            aadharNumber:req.body.adharNumber
        });
        creatNew.save();
        res.render("success",{
            name: name,
            email:email,
            phonenumber:phonenumber,
            slot:slot
        });
    }
    
        res.sendFile(__dirname+"/public/failure.html");
    }
});
});

// for getting all info 
app.get("/allinfo/shashikant12345@/",function(req,res){
    libraryModel.find({},{},function(err,data){
    res.render("allData",{data:data});

});
});


//Creating server 
app.listen(8000,function(){
    console.log("your server is running fine")});