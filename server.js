require("dotenv").config();
const express = require('express');
const postRoutes = require("./routes/posts/posts");
const userRoutes = require("./routes/users/users");
const commentRoutes = require("./routes/comments/comment");
require("./config/dbConnect");

const app = express();

//middlewares

//users route
app.use('/api/v1/users', userRoutes);

//post route
app.use('/api/v1/posts', postRoutes);

//comment
app.use('/api/v1/comments', commentRoutes);

//Error handler middlewares
//listen server

const PORT = process.env.PORT || 6800
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));