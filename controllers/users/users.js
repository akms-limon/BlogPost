const registerCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User registered",
        });
    }
    catch(error){
        res.json(error);
    }
}

const loginCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User login",
        });
    }
    catch(error){
        res.json(error);
    }
};

const userDetailsCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User Details",
        });
    }
    catch(error){
        res.json(error);
    }
};

const profileCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User profile",
        });
    }
    catch(error){
        res.json(error);
    }
};

const uploadProfilePhotoCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User profile image upload",
        });
    }
    catch(error){
        res.json(error);
    }
};

const uploadCoverImgCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User cover image upload",
        });
    }
    catch(error){
        res.json(error);
    }
};

const updatePasswordCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User password update",
        });
    }
    catch(error){
        res.json(error);
    }
}

const updateUserCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User update",
        });
    }
    catch(error){
        res.json(error);
    }
};

const logoutCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"User logout",
        });
    }
    catch(error){
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