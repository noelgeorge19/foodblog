const express = require("express");
const path = require("path");

const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require("./db/conn");
const Registers = require("./models/register")
const Contact = require("./models/contactus");
const { json } = require("express");
const { assert } = require("console");
const { callbackify } = require("util");
const port = process.env.PORT || 2600 ;
var urlencodedParser = bodyParser.urlencoded({extended: false})
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
//console.log(path.join(__dirname,"../public"));
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'foodtherapy';
app.use(express.json());
app.use (express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.send("index")
});

app.post("/contactus", urlencodedParser, (req, res) => {
    n = req.body.name
    e = req.body.email
    s = req.body.subject
    b = req.body.message
    if(n !== "" && e !== "" && s !== "" && b !== "")
    {
        try{
            const contactUs = new Contact({
                name : req.body.name,
                email : req.body.email,
                subject : req.body.subject,
                bdesc : req.body.message
            })
           contactUs.save();
           res.render('success.html');
           
    
    
        }catch(error){
            res.render('failure.html');
        }
    }
    else
    {
        res.render('failure.html');
    }
    
})
app.post("/register", urlencodedParser, (req, res) => {
        e1 = req.body.email
        n1 = req.body.name
        a1 = req.body.address
        c1 = req.body.city
        s1 = req.body.state
        z1 = req.body.zip
    
    if(e1 !== "" && n1 !== "" && a1 !== "" && c1 !== "" && s1 !== "" && z1 !== "")
    {
        try{
            const registerUs = new Registers({
                email : req.body.email,
                name : req.body.name,
                address : req.body.address,
                city : req.body.city,
                state : req.body.state,
                zip : req.body.zip
            })
            registerUs.save();
            res.render('regsuc.html');
    
    
        }catch(error){
            res.render('regfail.html');
        }
    }
    else
    {
        res.render('regfail.html');
    }

})

app.get('/cntus', (req,res) =>{
    const db = client.db(dbName)
    const collection = db.collection('contactus')
    collection.find({}).toArray(function(err, contact_list){
        res.render('cntus.ejs',{'contactus':contact_list})
    });
    
})
app.get('/rgstr', (req,res) =>{
    const db = client.db(dbName)
    const collection = db.collection('registereds')
    collection.find({}).toArray(function(err, register_list){
        res.render('rgstr.ejs',{'registereds':register_list})
    });
    
})
client.connect(function(err) {
    
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
  });
  

app.get('/login',(req,res) =>{
    res.render('login.html');
})
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})