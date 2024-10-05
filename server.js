require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride= require("method-override");
const globalErrhandler = require("./middlewares/globalHandler");
const commentRoutes = require("./routes/comments/comment");
const postRoutes = require("./routes/posts/posts");
const userRoutes = require("./routes/users/users");

require("./config/dbConnect");

const app = express();

//middlewares
app.use(express.json()); // pass incomming data
app.use(express.urlencoded({ extended: true })); // pass form data

//method override
app.use(methodOverride("_method"));

// configure ejs
app.set("view engine", "ejs");
//serve static files
app.use(express.static(__dirname, +"/public"));
// session config
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, //1 day
    }),
  })
);

//save the login user into locals
app.use((req,res,next)=>{
  if(req.session.userAuth){
  res.locals.userAuth=req.session.userAuth;
  }
  else{
    res.locals.userAuth=null;
  }
  next();
});

//render homepage
app.get("/", (req, res) => {
  res.render("index");
});

//users route
app.use("/api/v1/users", userRoutes);

//post route
app.use("/api/v1/posts", postRoutes);

//comment
app.use("/api/v1/comments", commentRoutes);

//Error handler middlewares
app.use(globalErrhandler);
//listen server

const PORT = process.env.PORT || 6800;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
