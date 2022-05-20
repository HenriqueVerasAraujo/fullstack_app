const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async(_req, res) => {
    const allPosts =  await Posts.findAll();
    return res.status(200).json(allPosts);
})

router.post('/', async (req, res) => {
    const post = req.body;
    console.log(post);
    await Posts.create(post);
    return res.status(201).json(post);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const singlePost = await Posts.findByPk(id);
    if(singlePost) {
        return res.status(200).json(singlePost);
    }
});

module.exports = router;