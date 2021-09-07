const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema({
    email : {
        type : String
        
    },
    name : {
        type : String
      
    },
    address : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
        
    },
    zip : {
        type : Number
    }
})

const Registers = new mongoose.model("Registered",registerSchema);
module.exports = Registers;