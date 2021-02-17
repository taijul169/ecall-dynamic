const mongoose = require("mongoose");
const validator = require("validator");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");


// clinic-infoschema
const clinicSchema = new mongoose.Schema({
    clinicphoto:{
     type: String,
    },
    clinicname:{
        type: String,
       },
    clinicaddress:{
        type: String,
       }
})
// experience schema
const experienceSchema = new mongoose.Schema({
    hosname:{
        type: String,
       },
    fromdate:{
           type: Date,
          },
    todate:{
           type: Date,
          }
})
// registration info schema
const registrationSchema = new mongoose.Schema({
    reginumber:{
        type: String,
       },
    passyear:{
           type: Date
          }
})
// education schema
const educationSchema = new mongoose.Schema({
    degree:{
        type: String,
       },
    college:{
           type: String,
          },
    passingyear:{
           type: String,
          }
})
const registerSchema = new mongoose.Schema({
    photo:{
        type:String
    },
    name:{
        type:String,
        minlength:3
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    dateofbirth:{
        type:Date
    },
    about:{
        type:String
    },
    phone:{
        type:Number,

    },
    city:{
        type:String
    },
    // clinic-information
    clinicinfo:[clinicSchema],
    // education-information
    education:[educationSchema],
     // experience-information
    experience:[experienceSchema],
    // Registration-information
    registration:[registrationSchema],
    specialties:{
        type:String
    },
    password: {
         type: String,
    },
    confirmpassword: {
        type: String,
   },
//    auto-token-generation
   tokens:[{
       token:{
        type: String,
       }
   }]
    
},{ autoIndex: false })
// creting-index
registerSchema.index({'city': 'text'})
// middleware for generating webtoken---------------
registerSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "mynameistaijulislamtopuiamajodejsdeveloperwithfiveyearsexpericencessecond");
        this.tokens =  this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        response.send(`the error part:${error}`);
    }


}

// middleware plane text to hash----(for the purpose of making password secured before storing in the database)--------------
registerSchema.pre("save", async function(next){
    if(this.isModified('password')){
       this.password =  await bycript.hash(this.password,10);
    //    ignoring confirmpassword store in the database
       this.confirmpassword =  await bycript.hash(this.confirmpassword,10);
    }
    next();
})
// Creating new collection
const Docregistration = new mongoose.model('Docregistration',registerSchema);
module.exports =  Docregistration;