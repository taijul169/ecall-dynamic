const { static } = require("express");
const express = require("express");
const nodemailer =  require("nodemailer")
const path = require("path");
const hbs = require("hbs");
const ejs = require("ejs");
const bycript = require("bcryptjs");
const bodyParser =  require("body-parser")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const fs  = require("fs");
const app = express();
const port = process.env.PORT || 5000;
// socket connetion
const http = require("http").createServer(app);
var io =  require('socket.io')(http);

const db = require("./db/conn");
const multer = require("multer");
const Docregistration = require("./models/register");
const Doctorappointment = require("./models/appointment");
const { handlebars } = require("hbs");

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
let userId ;

app.use(bodyParser.urlencoded({ extended: false }));           
app.use(bodyParser.json())
// supporting json data
app.use(express.json());
// getting cookie from browser
app.use(cookieParser())

app.use(express.urlencoded({ extended:false}));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);
// home-routing-----------------
app.get("/",(req, res)=>{
    res.render("index");
});
// doctor-sign-up-routing
app.get("/doctor-signup",(req, res)=>{
    res.render("doctor-signup");
});
// fileup routing
app.get("/fileup",(req, res)=>{
    res.render("fileup");
});

// file-uploading-functionality
var storage = multer.diskStorage({
    destination: function(req, res,cb){
        // cb= callback
        cb(null,'public/assets/images/uploads/')
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({storage: storage})

// uploading file-routing
app.post('/fileup', upload.single('proimg'), function(req, res, next){
    var fileinfo =  req.file.filename;
    console.log(fileinfo);
    res.send(fileinfo)
})



// doctor-dashboard-restricted
app.get("/doctor-dashboard", auth, async(req, res)=>{
    
    res.render("doctor-dashboard");
});
// doctor-profile-view-routing
app.get("/doctor-profile",(req, res)=>{
    res.render("doctor-profile");
});
// doctor-profile-update-routing
// app.get("/doctor-profile-settings/:id",(req, res)=>{
//      let id =  req.query.id
//      console.log(id);

//     res.render("doctor-profile-settings");
// });

// file-uploading-functionality
var storage = multer.diskStorage({
    destination: function(req, res,cb){
        // cb= callback
        cb(null,'public/assets/images/uploads/')
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({storage: storage})

// multiple input-file-upload
// var uploadMultiple = upload.fields([{name:'photo'},{name:'clinicphoto'}])
// doctor-profile-update-routing------------------------------------------------------------------------------------
// app.put("/doctor-profile-settings", upload.single('photo'), async(req, res, next)=>{
//     var fileInfo = req.file.filename;
//     try {
//       console.log(fileInfo);
//       const updateDoctor = new Docregistration({
            
//             photo:fileInfo,
//             lastname:req.body.lastname,
//             email:req.body.email,
//             gender:req.body.gender,
//             dateofbirth:req.body.dateofbirth,
//             about:req.body.about,
//             // clinicphoto:req.file.clinicphoto,
//             // clinicinfo =  clinicinfo.concat({clinicname:req.body.clinicname}),
//             // clinicinfo =  clinicinfo.concat({clinicaddress:req.body.clinicaddress}),
//             clinicinfo:[{clinicname:req.body.clinicname, clinicaddress:req.body.clinicaddress,}],
//             degree:req.body.degree,
//             college:req.body.college,
//             passingyear:req.body.passingyear,
//             hospitalname:req.body.hospitalname,
//             fromdate:req.body.fromdate,
//             todate:req.body.todate,
//             reginumber:req.body.reginumber,
//             passyear:req.body.passyear
            

//         })
        
//        next()
//        const updateData =  await updateDoctor.save()
//        console.log("data updated successfully")
//     } catch (error) {
//         res.status(400).send(`this is error part :${error}`)
//     }
//     // res.render("doctor-profile-settings");
// });
// app.get("/secret", auth, (req, res)=>{

//      res.render("secret");
// });

// -------------------------------------------------------------
// ------------------------------------------------------------
// doctor-profile-update-routing------------------------------------------------------------------------------------
app.post("/doctor-profile-settings", upload.single('photo'), async(req, res)=>{
    let id = req.body.hidden_id;
    console.log("this is coming from put:"+ id);
    // var fileInfo = req.file.filename;
    try {  
           function fileName(){
               var photoName =  req.file.filename;
               if(photoName){
                   return photoName
               }
           }
    //   console.log(fileInfo);
            var myquery = { _id:id};
        if(req.file){
            var newValues = { $set:{
                name:req.body.name,
                username:req.body.username,    
                // photo:fileInfo,
                photo:fileName(),
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                dateofbirth:req.body.dateofbirth,
                about:req.body.about,
                specialties:req.body.specialties,
                clinicinfo:[{clinicname:req.body.clinicname, clinicaddress:req.body.clinicaddress,}],
                education:[{degree:req.body.degree, college:req.body.college,passingyear:req.body.passingyear}],
                experience:[{hosname:req.body.hosname, fromdate:req.body.fromdate,todate:req.body.todate}],
                registration:[{reginumber:req.body.reginumber, passyear:req.body.passyear}],
                city:req.body.city
                }
            }
        }
        else{
            var newValues = { $set:{
                name:req.body.name,
                username:req.body.username,    
                // photo:fileInfo,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                dateofbirth:req.body.dateofbirth,
                about:req.body.about,
                specialties:req.body.specialties,
                clinicinfo:[{clinicname:req.body.clinicname, clinicaddress:req.body.clinicaddress,}],
                education:[{degree:req.body.degree, college:req.body.college,passingyear:req.body.passingyear}],
                experience:[{hosname:req.body.hosname, fromdate:req.body.fromdate,todate:req.body.todate}],
                registration:[{reginumber:req.body.reginumber, passyear:req.body.passyear}],
                city:req.body.city
                }
            }

        }
        const updateResult =  await Docregistration.findByIdAndUpdate(myquery,newValues,{
            useFindAndModify:false
        });
      res.render("doctor-profile-settings",{message:"Data Updated Successfully.."});
    } catch (error) {
        res.status(400).send(`this is error part :${error}`)
    }
    
});



// create new user(doctor) in our database
app.post("/doctor-signup", async(req, res)=>{

    try {

        const password  = req.body.password;
        const confirmpassword  = req.body.confirmpassword;

        if(password === confirmpassword){
            
           const regiDoctor = new Docregistration({
               name: req.body.name,
               phone:req.body.phone,
               email:req.body.email,
               password:req.body.password,
               confirmpassword:req.body.confirmpassword
           })
         
        // call  a function for generating a jsonwebtoken --------------- 
        const token = await regiDoctor.generateAuthToken();
        console.log(token);
        // setting cookie in the browser--------------------
        res.cookie("jwt",token, {
            httpOnly:true
        });
        console.log(regiDoctor);
        // saving data into database----------------------
        const registerData = await regiDoctor.save();
        console.log(registerData);
        res.status(201).render("login")
        }else{
            res.send("password are not maching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

// login-routing
app.get("/login", (req, res)=>{
    res.render("login")
})
// login- functionality----------------
app.post("/doctor-dashboard", async(req, res)=>{
    

    try {
       
        const phone  = req.body.phone;
        const password  = req.body.password;
        if(phone === "" || password === ""){
            res.render("login",{emptyMsg:"Field is required!!"})
        }
        const userData = await Docregistration.findOne({phone:phone});
    //    fecthing data from doctorappointment collection
       const appData = await Doctorappointment.find({doctor_id:userData._id});
       console.log(appData)
       
        // const userphone = userData.phone;
        // const userPassword = userData.password;

        // macthing database password and user input password by bycriptjs--------------------
        const isMatch = await bycript.compare(password, userData.password);
        // call  a function for generating a jsonwebtoken  ----------------
        const token = await userData.generateAuthToken();
        // setting cookie in the browser--------------------
        res.cookie("jwt",token, {
            // expires:new Date(Date.now() + 100000000),
            httpOnly:true
        });
        
        const errorMsg = "Invalid Login!!"
        if(isMatch){
            const logSuccMsg ="welcome"
            res.render("doctor-dashboard",{userData,appData, logSuccMsg});
            // res.write({message:"Successfully logged in.."})
        }
        else{
            res.render("login",{errorMsg});
        }
        
    } catch (error) {
        res.render("login",{errorMsg});
    }
});

// update-functionality
app.get("/doctor-profile-settings", async(req, res)=>{
    userId = req.query.id;
    console.log("the user id is:"+userId)
    let userData = await Docregistration.findById(userId);
    console.log(userData)
    //  userData = JSON.stringify(userData)
    console.log(userData.photo);
   res.render('doctor-profile-settings', {userData})
})
// logout functionality--------------------

app.get("/logout", auth, async(req,res)=>{
    try {
        res.clearCookie("jwt");
        console.log("logout success...");
        await req.userData.save();
        res.render("index");
        
        
    } catch (error) {
        res.status(500).send(error)
        
    }
})

// search-view-routing---------------
// app.get("/search-view", async(req, res)=>{
//     let userData = await Docregistration.find();
//     console.log(userData)
//     res.render("search-view",{userData})
// })

// search-view-routing---------------
app.get("/search-view/", async(req, res)=>{
    // helper -register
    handlebars.registerHelper("dataFoundNotFound", function(value){
        if(value === 0){
            return "No Data found with this address"
        }
    })
    const location = req.query.location;
    const docNurse = req.body.docNurse;
    let userData = await Docregistration.find({ $text: { $search: location }});
    console.log(userData)
    res.render("search-view",{userData,location})
})
//  api demo---------------
app.get("/search-view/", async(req,res)=>{
    let userData = await Docregistration.find({ $text: { $search: location }});
    return userData;
})

// doctor-profile-routing
app.get("/doctor-profile", (req, res)=>{
    res.render("doctor-profile")
})

// / create new appointment in our database
app.post("/booking-doctor/", async(req, res)=>{
    let dateobj =new  Date(req.body.date)
    formatedDate = dateobj.toDateString()
    try {

        const appointDoctor = new Doctorappointment({
            doctor_id:req.body.docId,
            doctor_name:req.body.docname,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender,
            date:formatedDate,
            time:req.body.time,
            age:req.body.age,
            address:req.body.address,
            description:req.body.description
        })
        // saving data into database----------------------
        const appointmentData = await appointDoctor.save();
        console.log(appointmentData);
        res.status(201).render("booking-success",{appointmentData})
        
    } catch (error) {
        res.status(400).send(error)
    }
})
// patientlist--routing
app.get("/patient-list", async(req, res)=>{

    userId = req.query.id;
    console.log("the user id is:"+userId)
    let userData = await Docregistration.findById(userId);
    //    fecthing data from doctorappointment collection
    const appData = await Doctorappointment.find({doctor_id:userId});
    //  userData = JSON.stringify(userData)
    console.log(userData.photo);
   res.render('patient-list', {userData,appData})
})
// view-invoice-routing
app.get("/invoice-view", async(req, res)=>{
    let id = req.query.id;
    let docappData = await Doctorappointment.findById(id);
    let docId =  docappData.doctor_id;
    let docData = await Docregistration.findById(docId);

    console.log(docData,docappData);
    res.render("invoice-view",{docappData,docData})

})
// app.listen(port, ()=>{
//     console.log(`Server is runnig at port no ${port}`);
// })



http.listen(port, function(){
    console.log(`Server is runnig at port no ${port}`);
})


io.on("connection", (socket)=>{
    console.log("User Connected "+ socket.id);
    socket.on("message", (data)=>{
        socket.broadcast.emit('message',data)

    })
})
// booking-doctor-routing
app.get("/booking-doctor/", async(req, res)=>{

    let id = req.query.id;
    let userData = await Docregistration.findById(id);
    res.render("booking-doctor",{userData})
   
})

// email sending -----------------------------------
app.get("/emailsend/" ,async(req, res)=>{

    let urlData =  req.query;
    const docId = urlData.doc_id;
    const patientId = urlData.id;
    let docData = await Docregistration.findById(docId);
    let patientData = await Doctorappointment.findById(patientId);
   try {

    let SENDER = docData.email;
    console.log(SENDER);
    let RECEIVER = patientData.email;

      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    service:"gmail",
    port: 465,
    secure: false,
    auth: {
      user: "taijul.polock@gmail.com", // generated ethereal user
      pass: "Barishal169169", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: SENDER, // sender address
    to: RECEIVER, // list of receivers
    subject: "Appointment Confirmation ✔", // Subject line
    text: `Your Appointment has been confirmed. You are requested to come to${docData.clinicinfo[0].clinicaddress} at ${patientData.time}`, // plain text body
    html: `<b>Patient Information</b> 
      <ul>
        <li><b>Name</b>:${patientData.firstname}</li>
        <li><b>Gender</b>:${patientData.gender}</li>
        <li><b>Phone</b>:${patientData.phone}</li>
        <li><b>Address</b>:${patientData.address}</li>
        <li><b>Problem Description</b>:${patientData.description}</li>
      </ul>

      <b>Doctor Information</b> 
      <ul>
        <li><b>Name</b>:${docData.name}</li>
        <li><b>Gender</b>:${docData.gender}</li>
      </ul>
    `
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   res.render("doctor-dashboard",{msg:"Email has been sent..."});
       
   } catch (error) {
       console.log("this is error part" +error)

   }
   
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

})