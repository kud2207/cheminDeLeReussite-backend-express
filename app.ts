import express from 'express';
import cors from 'cors';
import mongoConnect from './src/config/mongoDB';
import { studentRoutes } from './src/routes/student-routes';
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;
mongoConnect();


// Middleware
app.use(express.json());
app.use(cors()); 

//Routes
app.use('/student', studentRoutes);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
module.exports = app;