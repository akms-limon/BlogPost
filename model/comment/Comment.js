const mongoose = require("mongoose");
const User = require("../user/User");

//  schema

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//compile schema to from a model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;