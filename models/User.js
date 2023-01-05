const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltlangth = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //띄어쓰기를 자동으로 붙이기
        unique: 1 //같은 메일을 1개만 가능
    },
    password: {
        type: String,
        minlength: -5,
    },
    role: {
        type: Number,
        default: 0 //지정안할 시 0 으로 입력
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
});
//'save' 메서드 동작하기 전에
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {

        //비밀번호를 암호화 시킨다.(salt 적용)
        bcrypt.genSalt(saltlangth, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })

    }else {
        next();
    }

})
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //암호화된 비밀번호와 입력된 비밀번호가 동일한지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);

    })
}
userSchema.methods.generateToken = function(cb) {
    var user = this;

    //jsonwebtoken 이용해 로그인 토큰 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token -> 'secretToken' -> user._id
    user.token =token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}


const User = mongoose.model('User', userSchema);

module.exports = { User };