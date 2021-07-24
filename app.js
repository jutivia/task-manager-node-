const express= require('express');
const app= express();

app.use(express.static('/public'));

app.get('/hello', (req, res)=>{
    res.send('task manager app')
})

const port= 3000;
app.listen(port, ()=>{console.log(`server is listening on ${port}`)})

