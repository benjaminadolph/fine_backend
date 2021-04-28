const { response } = require('express')
const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const verify = require('./verifyToken')

const router = express.Router()

//Gets back all the Posts
//Private route 
    //router.get('/', verify, async (req,res) => {
router.get('/', async (req,res) => {
    const userid = req.query.userid
    try{
        User.findOne({ _id: userid })
            .populate('posts')
            .then((result) => {
                res.json(result.posts);
            })
    } catch(err) {
        res.json(err)
    }
}) 

//Submits a Post
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        userid: req.body.userid
    })
    try {
        const savedPost = await post.save()
        User.findOne({ _id: post.userid }, (err, user) => {
            if (user) {
                // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.posts.push(savedPost);
                user.save();
            }
        });
        res.json(savedPost);
 /*        User.findOne({ _id: post.userid })
            .populate('posts')
            .then((result) => {
                res.json(result.posts);
        }); */
    } catch(err) {
        res.json(err)
    }
})

//Delete a specific Post
router.delete('/:postId', async (req,res) => {
    const postid = req.query.postid
    const userid = req.query.userid
    try {
        const removedPost = await Post.deleteOne({_id: postid})
        const updatedUser = await User.updateOne(
            {_id: userid}, 
            { $pull: { posts: postid } }
        )
        res.json(removedPost)
    } catch(err) {
        res.json(err)
    }
})

//Update a specific Post
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

//Get back a specific Post
/* router.get('/:postId', async (req,res) => {
    try{
        const specificPost = await Post.findById(req.params.postId)
        res.json(specificPost)
    } catch(err) {
        res.json(err)
    }
})  */

module.exports = router