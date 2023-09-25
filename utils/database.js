import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI)
  throw new Error("Please define the MONGO_URI enviroment variable");

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('MongoDB is already connected');
        return
    }
    try {
        await mongoose.connect(MONGODB_URI || "http://localhost:8000", {
            dbName              : 'nextauth_ecommerce',
            useNewUrlParser     : true,
            useUnifiedTopology  : true,
        })
        .then((mongoose) => mongoose)
        
        isConnected = true
        console.log('MongoDB connected');       

    } catch (error) {
        console.log('Error_connectMongoDB: ', error );
        process.exit();
    }
}
