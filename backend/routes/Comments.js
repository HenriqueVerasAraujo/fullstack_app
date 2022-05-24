const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/validateToken')

router.post('/newComment', validateToken, async(req, res) => {
    const body = req.body
    const { userName } = req.user;
    await Comments.create({...body, userName,});
    res.status(201).send(body);
});

router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    const allComments = await Comments.findAll({ where:{ PostId: postId } });
    if(allComments) {
        return res.status(200).json(allComments);
    }
});

router.delete('/:commentId', validateToken, async (req, res) => {
    const { commentId } = req.params;
    await Comments.destroy({ where:{ id: commentId } });
    return res.json({message: 'comment deleted'});
});

module.exports = router;