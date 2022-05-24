const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { validateToken } = require('../middlewares/validateToken')

router.post('/', validateToken, async (req, res) => {
    const { id } = req.user;
    const { PostId } = req.body;
    const newLike = { PostId, UserId: id };
    const findLike = await Likes.findOne({where: {PostId, UserId: id}});
    console.log(findLike);
    if (!findLike) {
        await Likes.create(newLike);
        return res.json({message: 'Liked'});
    } else {
        await Likes.destroy({where: {PostId, UserId: id}});
        return res.json({message: 'Unlike'});
    }
})
module.exports = router;