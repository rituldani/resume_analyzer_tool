import mongoose from "mongoose"

const DB_NAME = "videotube"
const connectDB = async () => {
    try {
        // await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // console.log("connected to MONGODB!!")
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // serverSelectionTimeoutMS: 10000, // increase timeout
            // connectTimeoutMS: 10000
        });
        console.log(`DB connected to: ${conn.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB connection error ", error)
        process.exit(1);
    }
}

export default connectDB;