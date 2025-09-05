import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.name = 'dynamicForms';
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
db.url = `mongodb+srv://${username}:${password}@dynamicforms.t9f09.mongodb.net/?retryWrites=true&w=majority&appName=dynamicForms`; //&w=majority "for local :: mongodb://127.0.0.1:27017/dynamicForms` 

export const connectDB = () => {
    db.mongoose.set('strictQuery', false);
    db.mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            //log into file for tracking
            console.log("Connected to the database! " + new Date());
        })
        .catch(err => {
            //log into file for tracking
            console.log("Cannot connect to the database! ", new Date());
            console.error(err)
            process.exit();
        });
}
export default db;