const express = require(express);
const app = express();
const path = require("path");
const hbs = require("hbs");
const LogCollections = require("./src/mongodb");

app.use(express.json());
app.set("view engine","hbs");
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("log");
});

app.get("/sign",(req,res)=>{
    res.render("sign");
});

app.post("/sign", async (req,res)=>{
  const data = {
    email:req.body.email,
    password:req.body.password
  };
  await LogCollections.insertMany([data]);
  res.render("welcome");
});

app.post("/log", async (req,res)=>{
  try{
    const check = await LogCollections.findOne({email:req.body.email});
     
    if(check.password===req.body.password){
      res.render("welcome");
    }
    else{
      res.send("incorrect password");
    }
  }
 catch{
  res.send("incorrect details");
 }
});

app.listen(3000, ()=>{
    console.log("port connected");
});
