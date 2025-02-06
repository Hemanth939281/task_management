import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


const mongodb_uri = process.env.MONGODB_URI;

// connecting to monogodb

const connectDB = async () =>{
    try{

        if (!mongodb_uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

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