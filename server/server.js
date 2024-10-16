import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';


//db connection

mongoose.connect("mongodb+srv://@cluster0.eblfz.mongodb.net/",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch((error) => console.log('Connection error:', error));



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'content-type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma',
    ],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
