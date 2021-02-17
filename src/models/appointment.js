const mongoose = require("mongoose");
const validator = require("validator");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");



// schema for doctor appointment/booking

const appointmentSchema =  new mongoose.Schema({
    doctor_id:{
       type:String
    },
    doctor_name:{
        type:String
     },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    time:{
        type:String
    },
    date:{
        type:String,
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    age:{
        type:Number
    },
    description:{
        type:String
    },
    currentDate:{
        type:String,
        default:new Date().toLocaleDateString()
    }

})
// Creating a new collection
const Doctorappointment = new mongoose.model('Doctorappointment', appointmentSchema);
module.exports =  Doctorappointment;