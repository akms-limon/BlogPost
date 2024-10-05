const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const {
    createPostCtrl,
    fetchPostsCtrl,
    fetchPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
} = require("../../controllers/posts/posts");
const postRoutes = express.Router();
const protected = require('../../middlewares/protected');
const Post = require("../../model/post/Post");

// instance of multer
const upload = multer({
    storage,
});

//forms 

postRoutes.get('/get-post-form', (req, res) => {
    res.render('posts/addPost', {error: ""});
});

postRoutes.get('/get-form-update/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('posts/updatePost', {post, error: ""})
    }
    catch (error) {
        res.render('posts/updatePost', {error, post:""})
    }
})

//POST/posts
postRoutes.post('/', protected, upload.single('file'), createPostCtrl);

//GET/posts
postRoutes.get('/', fetchPostsCtrl);

//GET/posts/:id
postRoutes.get('/:id', fetchPostCtrl);

//DELETE/posts/:id
postRoutes.delete('/:id', protected, deletePostCtrl);

//put/posts/:id
postRoutes.put('/:id', protected, upload.single('file'), updatePostCtrl);

module.exports = postRoutes;