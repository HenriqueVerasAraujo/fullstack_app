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

module.exports = router;