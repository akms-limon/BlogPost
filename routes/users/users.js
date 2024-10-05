const express = require("express");
const multer = require('multer');
const storage = require("../../config/cloudinary");
const {
    registerCtrl,
    loginCtrl,
    userDetailsCtrl,
    profileCtrl,
    uploadProfilePhotoCtrl,
    uploadCoverImgCtrl,
    updatePasswordCtrl,
    updateUserCtrl,
    logoutCtrl,
} = require("../../controllers/users/users");
const protected = require("../../middlewares/protected");
const userRoutes = express.Router();
//Instance of multer
const upload = multer({storage});

//---
//rendering forms

//login form
userRoutes.get('/login',(req,res)=>{
    res.render('users/login',{
        error:""
    });
});

//register form
userRoutes.get('/register',(req,res)=>{
    res.render('users/register',{
        error:""
    });
    });

//upload profile photo
userRoutes.get('/upload-profile-photo-form',(req,res)=>{
    res.render('users/uploadProfilePhoto', {error: ""});
    });

//upload cover photo
userRoutes.get('/upload-cover-photo-form',(req,res)=>{
    res.render('users/uploadCoverPhoto',{error:""});
    });

//update user password
    userRoutes.get('/update-user-password',(req,res)=>{
        res.render('users/updatePassword',{error:""});
        });

//POST/api/v1/users/register
userRoutes.post('/register', registerCtrl);

//POST/login
userRoutes.post('/login', loginCtrl);

//GET/profile
userRoutes.get('/profile-page', protected, profileCtrl);

//put/profilephoto-upload/:id
userRoutes.put(
    '/profile-photo-upload/',
    protected,
    upload.single('profile'),
    uploadProfilePhotoCtrl
);

//put/cover-photo-upload/:id
userRoutes.put(
    '/cover-photo-upload/',
    protected,
    upload.single("cover"),
    uploadCoverImgCtrl
);

//put/update-password/:id
userRoutes.put('/update-password/', updatePasswordCtrl);

userRoutes.put('/update', updateUserCtrl);

//Get/logout
userRoutes.get('/logout', logoutCtrl);

//GET/:id
userRoutes.get('/:id', userDetailsCtrl);



module.exports = userRoutes;