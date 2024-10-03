const mongoose = require("mongoose");

// title, desc image catagiory

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
      enum: ["react js", "html", "css", "node js", "javascript", "other"],
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{
        type: mongoose.Schema.type.ObjectId,
        ref:'Comment'
    },]
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("POst", postSchema);
module.exports = post;
