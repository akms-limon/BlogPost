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

// instance of multer
const upload = multer({
    storage,
});

//forms 

postRoutes.get('/get-post-form', (req, res) => {
    res.render('posts/addPost', {error: ""});
});

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