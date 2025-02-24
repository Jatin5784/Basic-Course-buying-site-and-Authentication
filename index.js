const express = require('express');
const app = express();

const mongoose = require('mongoose')
const User = require('./User.js');

mongoose.connect('mongodb+srv://Jatin:Jatin%40050208@cluster0.fwmw9.mongodb.net/')
.then(console.log("Successfully connected to MongoDB"))
.catch(function(err) {console.log("Failed to connect")})


app.get('/',function(req , res) {
    res.send('Hello, Jatin! Your server is running.');

})

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

        res.status(201).json({message:"User created Successfully"});
    } catch(error){

        console.log("Error! creating user", error);
        res.status(404).json({message:"Inputs Error!"});

    }
});







app.listen(3000);
