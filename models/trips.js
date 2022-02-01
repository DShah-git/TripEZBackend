const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripsSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    tripName:{
        type:String,
        required:true,
    },
    tripLocation:{
        type:String,
        required:true,
    },
    days:{
        type:Schema.Types.Mixed,
        required:false,
    },
    atendees:{
        type:Schema.Types.Mixed,
        required:false,
    }
})


module.exports = mongoose.model('Trips',tripsSchema);