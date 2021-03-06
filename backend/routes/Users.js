const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

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
       return res.json({error: "Usuário não cadastrado"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        return res.json({error: "Senha invalida"});
    }
    const token = sign({userName: user.userName, id: user.id}, 'secretkey');
    return res.status(200).json({message: "You are logged in", token, id: user.id});
});

// router.get('/:postId', async (req, res) => {
//     const { postId } = req.params;
//     const allComments = await Comments.findAll({ where:{ PostId: postId } });
//     if(allComments) {
//         return res.status(200).json(allComments);
//     }
// });

module.exports = router;