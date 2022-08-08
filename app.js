const express = require('express');
const app = express();
const connectDb = require('./db/connect')
require('dotenv').config()
let routes = require('./routes/router')

//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', routes)


const port = process.env.port || 8000;

connectDb(process.env.MONGO_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  )
  .catch((err) => console.log(err))
