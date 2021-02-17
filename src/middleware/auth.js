const jwt = require("jsonwebtoken");
const Register = require("../models/register");


const auth = async (req, res, next) =>{
    
    try {
        console.log("auth is working");
        const token = req.cookies.jwt;
        console.log("token in auth:"+ token);
        const verifyUser = jwt.verify(token, "mynameistaijulislamtopuiamajodejsdeveloperwithfiveyearsexpericencessecond");
        console.log(verifyUser);
        const userData = await Register.findOne({_id:verifyUser._id})
        console.log(userData);
        req.token =  token;
        req.userData =  userData;
        next()
        
    } catch (error) {
        res.status(401).render("login")
    }
}

module.exports =  auth;