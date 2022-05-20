const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const postRouter = require('./routes/Posts')

app.use(express.json());
app.use(cors());

// ROUTERS:
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log('server running on port 3001'));
});
