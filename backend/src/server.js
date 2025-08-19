const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
dbConnect();

//Middleware 
app.use(express.json());


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 


//start server 
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});