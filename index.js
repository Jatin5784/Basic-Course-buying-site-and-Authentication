const express = require('express');
const app = express();

const mongoose = require('mongoose');
const User = require('./User.js');
const Courses = require('./Courses.js');

const jwt = require('jsonwebtoken');
const JwtKey= "JatinMeena";


mongoose.connect('mongodb+srv://Jatin:Jatin%40050208@cluster0.fwmw9.mongodb.net/')
.then(function (){console.log("Successfully connected to MongoDB")})
.catch(function(err) {console.log("Failed to connect",err)})


app.get('/',function(req , res) {
    res.send('Hello, Jatin! Your server is running.');

});

app.use(express.json());

app.post('/signup',async function(req,res){
    try{
        const {username,password} = req.body;

        if (!username || !password) {

            return res.status(400).json({ message: "Username and password are required." });
         }

         
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"User with this username already exist!"});
        }
         
        const newUser = new User({username,password});

        await newUser.save();

        const token=jwt.sign({username},JwtKey);
        console.log(token);
        
        res.status(201).json({message:"User created Successfully",token});
    } catch(error){

        console.log("Error! creating user", error);
        res.status(404).json({message:"Inputs Error!"});

    }
});

function verifytoken(req,res,next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){res.status(404).json({message:"No token provided!"})}

    try{
        req.user =jwt.verify(authHeader,JwtKey);
        console.log("JWT got verified");
        next();

    }
    catch(error){
        console.log("error in jwt",error);
        res.send("Error in JWT!");
    }

}

app.post('/newCourses',verifytoken, async function (req, res) {
    
    try{
        const {CourseName,CoursePrice} = req.body;
        
        const newCourse = new Courses({CourseName,CoursePrice});
        await newCourse.save();

        res.status(201).json({message:"Course created Successfully!"});
    }
    catch(error){
        console.log("Error! creating user", error);
        res.status(400).json({message:"Some error in creating a course"});
    }
})

app.get('/Courses',async function(req,res){

    try{
        
        const collections = await Courses.find({});
        console.log("Collections in the database:", collections);
        res.status(200).send(collections);
    }
    catch(error){
        console.log("Error! loading courses", error);
        res.status(400).json({message:"Some error in loading a courses"});
    }

})

app.listen(3000);
