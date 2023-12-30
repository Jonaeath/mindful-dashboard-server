const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config()


app.use(cors());
app.use(express.json());




app.get('/',(req,res)=>{
    res.send('Start up server is running')
}) 

app.listen(port, ()=>{
    console.log(`Start Up server running on ${port}`)
})
