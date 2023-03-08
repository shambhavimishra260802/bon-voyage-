const express=require("express");
const path=require("path")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const app=express();
const staticPath=path.join(__dirname,"/");
app.use(express.static(staticPath));




app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/bonvoyage',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/bookin",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var package= req.body.package;
    var date=req.body.date;

    var data = {
        "name": name,
        "email" : email,
        "phone": phone,
        "address" : address,
        "date" : date,
        "package":package
        
    }

    db.collection('bookings').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    if(package==="Goa Vibes")
        {
            return res.redirect("https://buy.stripe.com/test_cN2dTs8QWeS2g4o7sx");
        }
        if(package==="Kashmir-The Heavens")
        {
            return res.redirect("https://buy.stripe.com/test_dR6bLkebgdNY3hC8wC");
        }
        if(package==="Kasol Thrills")
        {
            return res.redirect("https://buy.stripe.com/test_aEU8z83wC11c2dyaEL")
        }
        if(package==="Kerela Godseye")
        {
            return res.redirect("https://buy.stripe.com/test_9AQ6r01ou4do3hCeV2")
        }
        if(package==="Assam")
        {
            return res.redirect("https://buy.stripe.com/test_aEU6r0d7ccJU7xS6ox")
        }
        if(package==="Agra")
        {
            return res.redirect("https://buy.stripe.com/test_3cscPo6IO6lw3hCfZ8")
        }

})
app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    db.collection('user').findOne({email:email},(err,collection)=>{
        if(err){
            res.send(err);
        }
        if(collection){
            if(collection.password===password)
            {
            res.redirect("../")
            }
            else{
                res.send("Password Doesn't Match")
            }
        }
        else{
            res.send("Email Not Found")
            
        }});
    

}
);
app.post("/signup",(req,res)=>{
    const {username,email,password,confirmpassword} = req.body;
    db.collection('user').findOne({email:email},(err,collection)=>{
        if(err){
            res.send(err);
        }
        if(collection){
            res.send({message:"User Already Exists"});
        }
        else{
            var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
    

    var data = {
        "name": name,
        "email" : email,
        "password": password,
        
        
    }

    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        return res.redirect("login.html")
    });
            
       }
    });
});

app.get("/",(req,res)=>
{
    
});
app.listen(3000,()=>{
    console.log("Running on 3000");

})