const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        trim: true,
        required:[ true, "please add your name"],
        maxlenght: [20, "Your name cannot be longer than 20 chars"]
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: [ true, "please enter an email"]
    },
    phoneNumber:{
        type: Number,
        unique: true,
        required:[ true, "please add your phone number"]
    },
    password:{
        type: String,
        trim: true,
        maxlenght: [8, "Your password should not "],
        required: [ true, "please enter a password"]
    }
}, {timestamps: true})

const Students = mongoose.model("Students", studentSchema)

module.exports = Students