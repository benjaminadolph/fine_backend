const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
// const verify = require('./verifyToken')

const router = express.Router();

// If you want to make a private route
// router.get('/', verify, async (req,res) => {

// Gets back all the Posts
router.get('/', async (req, res) => {
  const id = req.query.userid;
  try {
    User.findOne({ _id: id })
      .populate('posts')
      .then((result) => {
        res.json(result.posts);
      });
  } catch (err) {
    res.json(err);
  }
});

// Submits a Post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    userid: req.body.userid,
  });
  try {
    const savedPost = await post.save();
    User.findOne({ _id: post.userid }, (err, user) => {
      if (user) {
        // The below two lines will add the newly saved post
        // ObjectID to the the User's post array
        user.posts.push(savedPost);
        user.save();
      }
    });
    res.json(savedPost);
  } catch (err) {
    res.json(err);
  }
});

// Delete a specific Post
router.delete('/:postId', async (req, res) => {
  const post = req.query.postid;
  const user = req.query.userid;
  try {
    const removedPost = await Post.deleteOne({ _id: post });
    // eslint-disable-next-line no-unused-vars
    const updatedUser = await User.updateOne(
      { _id: user },
      { $pull: { posts: post } },
    );
    res.json(removedPost);
  } catch (err) {
    res.json(err);
  }
});

// Update a specific Post
/* router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        )
        res.json(updatedPost)
    } catch(err) {
        res.json(err)
    }
}) */

// Get back a specific Post
/* router.get('/:postId', async (req,res) => {
    try{
        const specificPost = await Post.findById(req.params.postId)
        res.json(specificPost)
    } catch(err) {
        res.json(err)
    }
})  */

module.exports = router;
