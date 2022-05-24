const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/validateToken');

router.get('/', async(_req, res) => {
    const allPosts =  await Posts.findAll({ include: [Likes]});
    return res.json(allPosts);
})

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    const{ userName, id } = req.user;
    const resBody = {...post, userName, UserId: id }
    await Posts.create(resBody);
    return res.json(resBody);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const singlePost = await Posts.findByPk(id, {include: [Likes]});
    if(singlePost) {
        return res.json(singlePost);
    }
});

module.exports = router;