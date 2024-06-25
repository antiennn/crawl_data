const mongoose = require("mongoose");

const News = new mongoose.Schema({
    content:{
        type: String,
        require:true,
        trim:true,
        unique: true
    },
    date:{
        type: Date,
        require:true,
        trim:true,
    },
    source:{
        type: String,
        require:true,
        trim:true,
    }
    
})

module.exports = new mongoose.model('news',News);