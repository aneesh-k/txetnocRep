const express = require("express");
const Posts = require("../models/Post")
const auth = require('../privateRoutes')

const route = express.Router();

route.get('/', auth, async (req, res) => {
    try {
        const post = await Posts.find();
        res.json(post)
       
    } catch (error) {
        res.json({ message: error })
    }

})

route.get('/:postId', auth,
    async (req, res) => {

        try {
            const post = await Posts.findById(req.params.postId);
            res.json(post);

        } catch (error) {
            res.json({ message: error })
        }

    })

route.post('/', async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    })
    const insertedPost = await post.save();
    try {
        res.status(200);
        res.json(insertedPost);

    } catch (error) {
        res.status(500)
        res.json(error)
    }
})


module.exports = route;

