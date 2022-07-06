//Module Imports
const mongoose=require('mongoose');


const mongoURI="mongodb+srv://seutkarsh:seutkarsh@cluster0.jdfj0.mongodb.net/?retryWrites=true&w=majority";

const connectToDatabase = async () =>{

   await mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully connected to Database");
        }
    })
}

module.exports = connectToDatabase;