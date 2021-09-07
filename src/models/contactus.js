const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name : {
        type : String
    
    },
    email : {
        type : String

    },
    subject : {
        type : String
    },
    bdesc : {
        type : String
    }
})

const Contact = new mongoose.model("Contactus",contactSchema);
module.exports = Contact;