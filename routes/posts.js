const { response } = require('express')
const express = require('express')
const Post = require('../models/Post')
const verify = require('./verifyToken')

const router = express.Router()

//Gets back all the Posts
//Private route 
    //router.get('/', verify, async (req,res) => {
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.json(err)
    }
}) 

//Gets back a specific Post
router.get('/:postId', async (req,res) => {
    try{
        const specificPost = await Post.findById(req.params.postId)
        res.json(specificPost)
    } catch(err) {
        res.json(err)
    }
}) 

//Submits a Post
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch(err) {
        res.json(err)
    }
})

//Delete a specific Post
router.delete('/:postId', async (req,res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost)
    } catch(err) {
        res.json(err)
    }
})

//Update a specific Post
router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
        )
        res.json(updatedPost)
    } catch(err) {
        res.json(err)
    }
})

module.exports = router