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
res.render('users/login');
});

//register form
userRoutes.get('/register',(req,res)=>{
    res.render('users/register');
    });

//profile template 
userRoutes.get('/profile-page',(req,res)=>{
    res.render('users/profile');
    });

//upload profile photo
userRoutes.get('/upload-profile-photo-form',(req,res)=>{
    res.render('users/uploadProfilePhoto');
    });

//upload cover photo
userRoutes.get('/upload-cover-photo-form',(req,res)=>{
    res.render('users/uploadCoverPhoto');
    });

//update user
    userRoutes.get('/update-user-form',(req,res)=>{
        res.render('users/updateUser');
        });

//POST/api/v1/users/register
userRoutes.post('/register', registerCtrl);

//POST/login
userRoutes.post('/login', loginCtrl);

//GET/profile
userRoutes.get('/profile', protected, profileCtrl);

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
userRoutes.put('/update-password/:id', updatePasswordCtrl);

userRoutes.put('/update/:id', updateUserCtrl);

//GET/:id
userRoutes.get('/:id', userDetailsCtrl);

//Get/logout
userRoutes.get('/logout', logoutCtrl);

module.exports = userRoutes;