const express= require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:'.env'});

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('mongodb Connected...')).catch(err =>console.log('Error :'+err));


app.get('/', (req, res)=> {
    res.send('Hello world! 안녕하세요너무힘드네이건.. ㅋ 열시미하자')
})

app.post('/register', (req, res) =>{
    // 가입 시 필요한 정보를 클라이언트에서 가져오기 -> 가져온 클라이언트를 Users/model과 대칭하여 넣어주기
    
    const user = new User(req.body)
    // req.body : bodyParser를 통해 받아온 정보가 json형식으로 받을 수 있다.


    user.save((err, userInfo)=> {
        if(err) return res.json({success : false, err});
        return res.status(200).json({
            success:true,
        })
    });
})
app.listen(port, ()=> console.log(`Example app listening on port : ${port}`));

