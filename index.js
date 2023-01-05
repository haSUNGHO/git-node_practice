const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongodb Connected...')).catch(err => console.log('Error :' + err));


app.get('/', (req, res) => {
    res.send('Hello world! 안녕하세요너무힘드네이건.. ㅋ 열시미하자')
})
app.post('/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 확인한다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '입력하신 이메일과 동일한 정보가 존재하지 않습니다.'
            })
        }
        //요청된 이메일이 존재하면, 해당 이메일의 비밀번호가 동일한지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) 
                return res.json({ loginSuccess: false, message: '해당 이메일과 비밀번호가 일치하지 않습니다.'});
            //로그인 성공 시 토큰을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에 ? 쿠키, 로컬 스토리지
                res.cookie("loginid", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })

            })
        })



    })



})

app.post('/register', (req, res) => {
    // 가입 시 필요한 정보를 클라이언트에서 가져오기 -> 가져온 클라이언트를 Users/model과 대칭하여 넣어주기

    const user = new User(req.body)
    // req.body : bodyParser를 통해 받아온 정보가 json형식으로 받을 수 있다.


    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        })
    });
})

app.listen(port, () => console.log(`Example app listening on port : ${port}`));

