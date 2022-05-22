const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/validateToken')

router.post('/newComment', validateToken, async(req, res) => {
    const body = req.body
    await Comments.create(body);
    res.status(201).send(body);
});

router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    const allComments = await Comments.findAll({ where:{ PostId: postId } });
    if(allComments) {
        return res.status(200).json(allComments);
    }
});

module.exports = router;