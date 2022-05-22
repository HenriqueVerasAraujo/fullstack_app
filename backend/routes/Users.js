const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async(req, res) => {
    const { password, userName } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
        userName,
        password: hashPassword,
    }
    await Users.create(newUser);
    return res.status(201).json(newUser);
});

router.post('/login', async(req, res) => {
    const { password, userName } = req.body;
    const user = await Users.findOne({where: { userName }});
    if (!user) {
       return res.status(400).json({message: "Usuário não cadastrado"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        return res.status(400).json({message: "Senha invalida"});
    }
    return res.status(200).json(user);
});

// router.get('/:postId', async (req, res) => {
//     const { postId } = req.params;
//     const allComments = await Comments.findAll({ where:{ PostId: postId } });
//     if(allComments) {
//         return res.status(200).json(allComments);
//     }
// });

module.exports = router;