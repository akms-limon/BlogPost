const Post = require("../../model/post/Post");
const User = require("../../model/user/User"); 
const appErr = require("../../utils/appErr");

const createPostCtrl = async(req, res, next)=>{
    const {title, description, category, user} = req.body;
    try {
        if (!title || !description || !category || !req.file) {
            return res.render("posts/addPost", {error: "All fields are required"});
        }
        //find the user
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        // create a post
        const postCreated = await Post.create({
            title, 
            description,
            category,
            user: userFound._id,
            image: req.file.path,
        });
        //Push the post create into the array of user's posts
        userFound.posts.push(postCreated._id);
        //re save 
        await userFound.save();
        //redirect 
        res.redirect("/");
    }
    catch(error){
        return res.render("posts/addPost", {error: error.message});    
    }
};

const fetchPostsCtrl = async(req, res, next)=>{
    try {
        const posts = await Post.find().populate('comments').populate("user");
        res.json({
            status: "success",
            data: posts,
        });
    }
    catch(error){
        next(appErr(error.message));
    }
};

const fetchPostCtrl = async(req, res, next)=>{
    try {
        // get the id from params
        const id = req.params.id;
        //find the post
        const post = await Post.findById(id).populate({
            path: 'comments',
            populate:{
                path:'user',
            },
        }).populate('user');
        const user = await User.findById(post.user);
        
        res.render('posts/postDetails',{
            post,
            user,
            error: "", 
        })
    }
    catch(error){
        next(appErr(error.message));
    }
};

const deletePostCtrl = async(req, res, next)=>{
    try {
        //find the post
        const post = await Post.findById(req.params.id);
        //if the post belongs to the user
        if (post.user.toString() !== req.session.userAuth.toString()) {
            return res.render("posts/postDetails", {
                error: "You are not athorized to delete this post",
                post,
            });
        }
        // delete post
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        //redirect
        res.redirect('/');
    }
    catch(error){
        return res.render("posts/postDetails", {
            error: error.message,
            post:'',
        });
    }
};

const updatePostCtrl = async(req, res, next)=>{
    const {title, description, category} = req.body;
    try {
        //find the post
        const post = await Post.findById(req.params.id);
        //if the post belongs to the user
        if (post.user.toString() != req.session.userAuth.toString()) {
            return res.render('posts/updatePost', {
                post: "",
                error: "You are not authorized",
            });
        }
        //check if user is updating image
        if (req.file) {
            //update with image
            await Post.findByIdAndUpdate(req.params.id, {
                title, 
                description,
                category,
                image: req.file.path,
            }, {
                new: true,
            });
        }
        else {
            //update without image
            await Post.findByIdAndUpdate(req.params.id, {
                title, 
                description,
                category,
            }, {
                new: true,
            });
        }
        //redirect
        res.redirect("/");
    }
    catch(error){
        return res.render('posts/updatePost', {
            post: "",
            error: error.message,
        });
    }
}

module.exports = {
    createPostCtrl,
    fetchPostsCtrl,
    fetchPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
};