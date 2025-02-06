
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodb_uri = process.env.MONGODB_URI;
(mongodb_uri) ? mongodb_uri : ''

// connecting to monogodb

const connectDB = async () =>{
    try{

        if (mongoose.connection.readyState >= 1) return ;
        await mongoose.connect(mongodb_uri,{
            dbName : 'task_management'
        })

        console.log("connected to mongodb successfully");
    }
    catch(error){
        console.error("Error connecting to mongodb: ",error);
    }
}
connectDB();

export default connectDB;