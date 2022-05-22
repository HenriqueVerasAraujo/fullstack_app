const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const { validateToken } = require('../middlewares/validateToken');

router.get('/', async(_req, res) => {
    const allPosts =  await Posts.findAll();
    return res.status(200).json(allPosts);
})

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    const userName = req.user;
    await Posts.create({...post, userName,});
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