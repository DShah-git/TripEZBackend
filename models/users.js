const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }, 
    phone:{
        type:String,
        required:false,
    }   
    
})




module.exports = mongoose.model('Users',usersSchema);