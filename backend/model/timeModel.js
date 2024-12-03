import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    time : {
        type : String, 
        required : true,
    }
})

export default mongoose.model("timetables",userSchema)