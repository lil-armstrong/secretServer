const dbConnection = require('./config/mongodb.config.js');
const express = require('express');
const url = require('url');
const session = require('express-session');
const cors = require('cors');
const {
  v4: uuidv4
} = require('uuid');
const router = require('./router');
const models = require('./models')
const port = 8000;
const app = express ();


const serve = function() {
    dbConnection.once('open', ()=> {
      app.use(express.urlencoded({
        extended: true
      }))
      app.use(express.json());
      app.use(cors())
      // app.use(session({
      //   cookie: {
      //     maxAge: 3600000, sameSite: true
      //   },
      //   secret: uuidv4(),
      //   saveUninitialized: true,
      //   resave: false
      // }))
      // // Routing
      router(app);

      // Start server
      app.listen({
        port
      }, ()=> {
        console.log(`Server listening on port ${port}`)
      })
    });
}

serve()