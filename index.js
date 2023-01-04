const express= require('express');
const app = express();
const port = 3003;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tjdgh0212:tjdgh1082!@cluster0.twalcy1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('mongodb Connected...')).catch(err =>console.log('Error :'+err));


app.get('/', (req, res)=> {
    res.send('Hello world! 안녕하세요')
})
app.listen(port, ()=> console.log(`Example app listening on port : ${port}`));

