import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from 'cors';
import route from "./routes/userRoute.js"
import timeroute from "./routes/timeRoute.js"
import locationroute from "./routes/locationRoute.js"
import triproute from "./routes/tripRoute.js"
import seatbookroute from "./routes/seatBookRoute.js"


const app = express ();
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL; 

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected Successfully.")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port : ${PORT}`)
    })
}).catch(error => console.log(error));

app.use(cors());
app.use(express.json());

//app.use("/api/user", route)
app.use("/api/admin",timeroute)
app.use("/api/admin",locationroute)
app.use("/api/admin",triproute)
app.use("/api/admin",seatbookroute)