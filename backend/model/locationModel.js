import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    location : {
        type : String, 
        required : true,
    }
})

export default mongoose.model("locationtables",userSchema)