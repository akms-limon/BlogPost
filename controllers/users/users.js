const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//register
const registerCtrl = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    // check if field is empty
    if (!fullname || !email || !password) {
        return next(appErr('All fields are required'));
    }
    try {
        //1. check if user exist (email)
        const userFound = await User.findOne({email});
        //throw and error
        if (userFound) {
            return next(appErr("User already Exist"));
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const user = await User.create({
            fullname,
            email,
            password: passwordHashed,
        });

        res.json({
            status: "success",
            data: user,
        });
    }
    catch (error) {
        res.json(error);
    }
}

//login
const loginCtrl = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(appErr('Email and password field are required'));
    }
    try {
        //check if email exist
        const userFound = await User.findOne({ email });
        if (!userFound) {
            //throw an
            return next(appErr('Invalid login Credentials'));
        }
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            // through an error
            if (userFound) {
                return next(appErr('Invalid login Credentials'));
            }
        }
        // save the user into session
        req.session.userAuth = userFound._id;
        console.log(req.session);
        res.json({
            status: "success",
            data: userFound,
        });
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
        res.json({
            status: "success",
            data: user,
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
        res.json({
            status: "success",
            data: user,
        });
    }
    catch (error) {
        res.json(error);
    }
};

const uploadProfilePhotoCtrl = async (req, res, next) => { 
    console.log(req.file.path);
    try {
        // find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        //check if user is not found
        if (!userFound) {
            return next(appErr("User not found", 403));
        }
        // update profile photo
        const userUpdated=await User.findByIdAndUpdate(userId, {
            profileImage: req.file.path,
        }, {
            new: true,
        });
        res.json({
            status: "success",
            data: userUpdated,
            //data: "You have successfully updated your profile photo",
        });
    }
    catch (error) {
        next(appErr(err.message));
    }
};

const uploadCoverImgCtrl = async (req, res, next) => {
    console.log(req.file.path);
    try {
        // find the user to be updated
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        //check if user is not found
        if (!userFound) {
            return next(appErr("User not found", 403));
        }
        // update profile photo
        const userUpdated=await User.findByIdAndUpdate(userId, {
            coverImage: req.file.path,
        }, {
            new: true,
        });
        res.json({
            status: "success",
            data: userUpdated,
        });
    }
    catch (error) {
        next(appErr(err.message));
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
            await User.findByIdAndUpdate(req.params.id, {
                password: passwordHashed,
            }, {
                new: true,
            });
            res.json({
                status: "success",
                user: "Password has been changed successfully",
            });
        }
    }
    catch (error) {
        return next(appErr("Please provide password field"));
    }
}

const updateUserCtrl = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        //check if email is not taken
        if (email) {
            const emailTaken = await User.findOne({email});
            if (emailTaken) {
                return next(appErr("Email is taken", 400));
            }
        }
        //update the user 
        const user = await User.findByIdAndUpdate(req.params.id, {
            fullname,
            email,
        }, {
            new: true,
        });
        res.json({
            status: "success",
            data: user,
        });
    }
    catch (error) {
        return next(appErr(error.message));
    }
};

const logoutCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            user: "User logout",
        });
    }
    catch (error) {
        res.json(error);
    }
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