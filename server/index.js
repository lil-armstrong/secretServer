const { mongoose, uri, options } = require('./config/mongodb.config.js');
const express = require('express');
const cors = require('cors');
const router = require('./router');

const port = 8000;
const app = express();
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cors({
    origin: '*'
}))

// // Routing
router(app);

(async () => {
    try {
        const connection = await mongoose.connect(uri, options);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    } catch (err) {
        if (process.env.NODE_DEBUG) {
            console.log(err)
        } else
            console.log('Mongoose connection error');
    }
})()