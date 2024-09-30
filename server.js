require("dotenv").config();
const express = require('express');

require("./config/dbConnect");

const app = express();


//middlewares
//routes
//Error handler middlewares
//listen server

const PORT = process.env.PORT || 6800
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));

// this is for check
