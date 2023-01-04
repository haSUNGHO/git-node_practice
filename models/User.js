const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, //띄어쓰기를 자동으로 붙이기
        unique : 1 //같은 메일을 1개만 가능
    },
    role : {
        type : Number,
        default : 0 //지정안할 시 0 으로 입력
    },
    image : String,
    token : {
        type : String,
    },
    tokenExp : {
        type : number
    }
})

const user = mongoose.model('User', userSchema)

module.exports ={user};