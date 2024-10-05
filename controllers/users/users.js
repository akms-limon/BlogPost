const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    console.log(req.body);
    // check if field is empty
    if (!fullname || !email || !password) {
        //return next(appErr('All fields are required'));
        return res.render("users/register",{
            error:"All fields are required",
        });
    }
    try {
        //1. check if user exist (email)
        const userFound = await User.findOne({email});
        //throw and error
        if (userFound) {
            return res.render("users/register",{
                error:"Email is taken",
            });
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const user = await User.create({
            fullname,
            email,
            password: passwordHashed,
        });
        // redirect
        res.redirect("/api/v1/users/profile-page");
    }
    catch (error) {
        res.json(error);
    }
}

//login
const loginCtrl = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.render("users/login",{
            error:"All fields are required",
        });
    }
    try {
        //check if email exist
        const userFound = await User.findOne({ email });
        if (!userFound) {
            //throw an
            return res.render("users/login",{
                error:"Invalid login Credentials",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            // through an error
            if (userFound) {
                return res.render("users/login",{
                    error:"Invalid login Credentials",
                });
            }
        }
        // save the user into session
        req.session.userAuth = userFound._id;
         // redirect
         res.redirect("/api/v1/users/profile-page");
    }
    catch (error) {
        res.json(error);
    }
};

const userDetailsCtrl = async (req, res) => {
    try {
        //get userId from params
        const userId = req.params.id;
        //find the user
        const user = await User.findById(userId);
    //    return res.json({
    //         status: "success",
    //         data: user,
    //     });
        return res.render("users/updateUser",{
            user,
            error:"",
        });
    }
    catch (error) {
        res.json(error);
    }
};

const profileCtrl = async (req, res) => {
    try {
        //get the login user 
        const userID = req.session.userAuth;
        //find the user 
        const user = await User.findById(userID).populate('posts').populate('comments');
        console.log(user)
        return res.render("users/profile",{user});
    }
    catch (error) {
        res.json(error);
    }
};

const uploadProfilePhotoCtrl = async (req, res, next) => { 
    try {//check if file exists
        if(!req.file){
           return res.render('users/uploadProfilePhoto',{
                error:'Please upload image'
            });
        }
        // find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        //check if user is not found
        if (!userFound) {
            return res.render('users/uploadProfilePhoto',{
                error:'User not found',
            });
        }
        // update profile photo
        const userUpdated=await User.findByIdAndUpdate(userId, {
            profileImage: req.file.path,
        }, {
            new: true,
        });
        res.redirect('/api/v1/users/profile-page');
    }
    catch (error) {
        return res.render('users/uploadProfilePhoto',{
            error:error.message,
        });
        
    }
};

const uploadCoverImgCtrl = async (req, res, next) => {
    console.log(req.file.path);
    try {
        // find the user to be updated
        if(!req.file){
            return res.render('users/uploadCoverPhoto',{
                 error:'Please upload image'
             });
         }
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        //check if user is not found
        if (!userFound) {
            return res.render('users/uploadCoverPhoto',{
                error:'User not found',
            });        }
        // update profile photo
        const userUpdated=await User.findByIdAndUpdate(userId, {
            coverImage: req.file.path,
        }, {
            new: true,
        });
        res.redirect('/api/v1/users/profile-page');
    }
    catch (error) {
        return res.render('users/uploadCoverPhoto',{
            error:error.message,
        });
    }
};

const updatePasswordCtrl = async (req, res, next) => {
    const {password} = req.body;
    try {
        //check if user is updating the password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            //update user 
            await User.findByIdAndUpdate(req.session.userAuth, {
                password: passwordHashed,
            }, {
                new: true,
            });
            res.redirect('/api/v1/users/profile-page');
        }
    }
    catch (error) {
        return res.render('users/uploadCoverPhoto',{
            error:error.message,
        });     }
}

const updateUserCtrl = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        if(!fullname||!email){
            return res.render('users/updateUser',{
                error:"Please provide info",
                user:"",
            });
        }
        //check if email is not taken
        if (email) {
            const emailTaken = await User.findOne({email});
            if (emailTaken) {
                return res.render('users/updateUser',{
                    error:"Email is taken",
                    user:"",
                });
            }
        }
        //update the user 
        await User.findByIdAndUpdate(
            req.session.userAuth,
             {
            fullname,
            email,
        }, {
            new: true,
        });
        res.redirect('/api/v1/users/profile-page');
    }
    catch (error) {
        return res.render('users/updateUser',{
            error:error.message,
             user:"",
        });
    }
};

const logoutCtrl = async (req, res) => {
    //destroy sesson
    req.session.destroy(()=>{
        res.redirect("/api/v1/users/login");
    });
};

module.exports = {
    registerCtrl,
    loginCtrl,
    userDetailsCtrl,
    profileCtrl,
    uploadProfilePhotoCtrl,
    uploadCoverImgCtrl,
    updatePasswordCtrl,
    updateUserCtrl,
    logoutCtrl,
};