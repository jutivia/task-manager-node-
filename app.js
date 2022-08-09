const express = require('express');
const app = express();
const connectDb = require('./db/connect')
require('dotenv').config()
let routes = require('./routes/router')
const notFound = require('./middleware/notFound')
const errorHandler = require("./middleware/error");
//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', routes)

app.use([notFound,errorHandler]);
const port = process.env.PORT || 8000;

connectDb(process.env.MONGO_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  )
  .catch((err) => console.log(err))
