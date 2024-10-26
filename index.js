import express, { response } from "express";
// import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";
import { config } from "dotenv";


//using express module as app
const app = express();
config()

//using CORS (Cross Origin Resoucrce Sharing)
    // option1: using default cors options
        app.use(cors())
    //option2: using manual options for cors
        // app.use(cors({
        //     origin:'http://localhost:3000',
        //     methods:['GET','POST','PUT', 'DELETE'],
        //     allowedHeaders:['Content-Type'],
        // }))

//Middleware for parsing request body
app.use(express.json());

//booksRoute
app.use('/books',booksRoute)

//Serving the website
app.get('/',(request,response)=>{
    return response.status(234).send('Welcome guys');
});



//Database Connection
mongoose
    .connect(process.env.mongoDBURL)
    .then(()=>{
        console.log("Database connected Successfully");
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening: ${process.env.PORT}`);
        })
        
    })
    .catch((error)=>{
        console.error(error)
    })