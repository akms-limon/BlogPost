const createCommentCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"comment created",
        });
    }
    catch(error){
        res.json(error);
    }
};

const commentDetailsCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"Post Comments",
        });
    }
    catch(error){
        res.json(error);
    }
};

const deleteCommentCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"Comments deleted",
        });
    }
    catch(error){
        res.json(error);
    }
};

const updateCommentCtrl = async(req,res)=>{
    try {
        res.json({
            status: "success",
            user:"Comment Updated",
        });
    }
    catch(error){
        res.json(error);
    }
}

module.exports = {
    createCommentCtrl,
    commentDetailsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
}