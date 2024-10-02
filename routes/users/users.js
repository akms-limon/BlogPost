const express = require("express");
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
const userRoutes = express.Router();

//POST/api/v1/users/register
userRoutes.post('/register', registerCtrl);

//POST/login
userRoutes.post('/login', loginCtrl);

//GET/:id
userRoutes.get('/:id', userDetailsCtrl);

//GET/profile/:id
userRoutes.get('/profile/:id', profileCtrl);

//put/profilephoto-upload/:id
userRoutes.put('/profile-photo-upload/:id', uploadProfilePhotoCtrl);

//put/cover-photo-upload/:id
userRoutes.put('/cover-photo-upload/:id', uploadCoverImgCtrl);

//put/update-password/:id
userRoutes.put('/update-password/:id', updatePasswordCtrl);

userRoutes.put('/update/:id', updateUserCtrl);

//Get/logout
userRoutes.get('/logout', logoutCtrl);

module.exports = userRoutes;