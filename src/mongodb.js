const mongoose = require("mongoose");

mongoose.connect("monmgodb://localhost:27017/BfxProject")
.then(()=>{
    console.log("mongodb connected");
}).catch(()=>{
    console.log("failed to connect");
})

const Logschema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model("LogCollections",Logschema);

module.exports = collection;