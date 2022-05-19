const express = require('express');
const app = express();
const db = require('./models');
const postRouter = require('./routes/Posts')

app.use(express.json());

// ROUTERS:
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('server running on port 3001'));
});
