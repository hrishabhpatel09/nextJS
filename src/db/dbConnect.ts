import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDb Connected')
        })
        connection.on('error',(error)=>{
            console.log('MongoDB connection error Please Make sure DB Is Up, '+error);
            process.exit();
        })
    } catch (error) {
        console.log(error,'Failed to Connect Database...')
    }
}