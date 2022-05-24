const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const postRouter = require('./routes/Posts');
const commentsRouter = require('./routes/Comments');
const usersRouter = require('./routes/Users');
const likesRouter = require('./routes/Likes');

app.use(express.json());
app.use(cors());

// ROUTERS:
app.use('/posts', postRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);
app.use('/likes', likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {console.log('server running on port 3001');
console.log('0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')});
});
