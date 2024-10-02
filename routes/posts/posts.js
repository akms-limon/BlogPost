const express = require("express");
const {
    createPostCtrl,
    fetchPostsCtrl,
    fetchPostCtrl,
    deletePostCtrl,
    updatePostCtrl,
} = require("../../controllers/posts/posts");
const postRoutes = express.Router();

//POST/posts
postRoutes.post('/', createPostCtrl);

//GET/posts
postRoutes.get('/', fetchPostsCtrl);

//GET/posts/:id
postRoutes.get('/:id', fetchPostCtrl);

//DELETE/posts/:id
postRoutes.delete('/:id', deletePostCtrl);

//put/posts/:id
postRoutes.put('/:id', updatePostCtrl);

module.exports = postRoutes;