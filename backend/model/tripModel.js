import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    busID : {
        type : String, 
        required : true,
    },
    tripID :{
        type : String,
        required : true
    }, 
    startlocation : { 
        type : String, 
        required : true,
    },
    destination : { 
        type : String ,
        required  :true
    },
    date : { 
        type : Date ,
        required  :true
    },
    departuretime :{
        type : String,
        required : true
    }
})

export default mongoose.model("addtrip",userSchema)