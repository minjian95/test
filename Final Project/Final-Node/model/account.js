const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    userName : String,
    password : String,
    avatarURL:String,
    nickName:String,
    registerDate:Date,
    location:String,
    description:String,
    imgCover:String,
    posts:[{
        postAvatar:String,
        postUserId:String,
        postUserName:String,
        postNickName:String,
    	title:String,
    	review:String,
    	postDate:Date,
    	postLocation:String,
        photo:{
    	                fileName: String,
                        fileType: String,
                        value:String,
                     }
                     
    }]
});

module.exports = mongoose.model("Account", accountSchema);