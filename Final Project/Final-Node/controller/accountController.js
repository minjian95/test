const Account = require('../model/account');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'minjian95xx@gmail.com',
      pass: 'lclittlerice1994'
    }
  });

//create and save a new account
exports.createAcc = (req, res) =>{
    Account.findOne({userName : req.body.userName})
    .then(existAcc => {
        if(existAcc) {
            return res.status(400).send({
                message : "Oops~ This account already exist"
            });
        }
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        const pwdRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;//must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter
        if(!emailRegex.test(req.body.userName)){
            return res.status(400).send({
                'message' : "Please give us a valid email address"
            });
        }
        if(!pwdRegex.test(req.body.password)){
            return res.status(400).send({
                'message' : "Your password is not safety enough"
            });
        }
        const account = new Account({
            userName : req.body.userName,
            password : req.body.password,
            avatarURL: "../../assets/image/IconImage/default-avatar.png",
            nickName : "nameless",
            location : "unknown",
            description : "write something about yourself",
            registerDate : new Date()
            
        });
        account.save().then(()=>{
            let email = req.body.userName;
            let htmlContent = `<p>Hi,</p ><p>Welcome to BestTrip! We are excited that you are a part of the community. Come visit our website and connect with others!</p ><p>All the best,</p ><p>The BestTrip Team</p >`;
            let mailOptions = {
                from: 'minjian95xx@gmail.com',
                to: email,
                subject: 'Welcome! Get started with BestTrip',
                text: '',
                html: htmlContent
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send({
                'message' : "Your're done, welcome to BestTrip!"
            });
        }).catch(err =>{
            res.status(500).send({
                'message' : "Something wrong happened"
            });
        });
    });
}
//check the log in input compare to database
exports.checkAcc = (req,res) =>{
    const data = {
        userName : req.params.userName,
        password : req.params.password
    };
    Account.findOne(data, (error, user) =>{
        if(!user || error){
            res.status(401).send({
                'message' : 'Invalida Username/Password'
            });
        }else{
            res.status(200).send({'user': user});
        }
    })
}
// update the account
exports.updateAcc = (req,res) => {
        //check repeat userName
 Account.findOne({userName : req.body.userName})
    .then(existAcc => {
        if(existAcc && (req.body.userName!=req.params.oldUserName)) {
            return res.status(400).send({
                message : "Oops~ This email already exist"
            });
        }
        //check password and repassword
        if(req.body.password!=req.body.repassword){
            return res.status(400).send({
                message : "Password match fail"
            });
        }
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        const pwdRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;//must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter
        if(!emailRegex.test(req.body.userName)){
            return res.status(400).send({
                'message' : "Please give us a valid email address"
            });
        }
        if(!pwdRegex.test(req.body.password)){
            return res.status(400).send({
                'message' : "Your password is not safe enough"
            });
        }
        Account.findOne({ userName:req.params.oldUserName })
    .then(account => {
        if(!account) {
            return res.status(401).send({
                message: "Account not found with email " + req.params.email
            });
        }
        let i = 0;
        while(i<account.posts.length) {
            account.posts[i].postAvatar = req.body.avatarURL;
            account.posts[i].postUserName = req.body.userName;
            account.posts[i].postNickName = req.body.nickName;
            i++;   
        }
        account.save().then(() => {
           
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while updating the posts."
        });
    });
         Account.findOneAndUpdate({userName:req.params.oldUserName},{$set:{
            userName : req.body.userName,
            password :  req.body.password,
            nickName : req.body.nickName,
            avatarURL : req.body.avatarURL,
            location : req.body.location,
            description : req.body.description
             }},{new:true}).then((docs)=>{
            if(docs) {
                if(req.body.userName!=req.params.oldUserName) {
                    let email = req.body.userName;
                    let htmlContent = `<p>Hi,</p ><p>You recently changed email address of your BestTrip account. If you did not do this, please contact us right away.</p ><p>Thanks for using BestTrip!</p ><p>The BestTrip Team</p >`;
                    let mailOptions = {
                        from: 'minjian95xx@gmail.com',
                        to: email,
                        subject: 'Confirmation of email address update',
                        text: '',
                        html: htmlContent
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });
                }
                res.status(200).send({ message: 'Account updated successfully'});

             } else {
                return res.status(400).send({
                'message' : "Your userName is not exist"
                });
             }
        }).catch((err)=>{
             return res.status(500).send({
                message: err.message || "Some error occurred while creating the Posts."
             });
         })


    });
}




//get user
exports.getUser = (req,res) => {
    const data = {
        _id: req.params.id  };
    Account.findOne(data,(error,user) =>{
          if(!user || error){
            res.status(401).send({
                'message' : 'Invalida _id'
            })
        }else{
            res.send({'user': user});
        }
    })
}

//create post for current user
exports.createPost = (req,res) =>{
    // Validate request
    if(!req.body.title){
          req.body.title="";
       
    }
    if(!req.body.review) {
        return res.status(400).send({
            message: "Review cannot be empty"
        });
    }
    
    // Find account and update it with the request body
     Account.findOne({ userName: req.params.userName })
    .then(account => {
        if(!account) {
            return res.status(401).send({
                message: "Account not found with email " + req.params.userName
            });            
        }
        if(req.body.photo==null){
            var photo={
                    value:""
                };
            account.posts.push(
            {   
                postAvatar:account.avatarURL,
                postUserId:account._id,
                postUserName:account.userName,
                postNickName:account.nickName,
                title:req.body.title,
                review:req.body.review,
                postLocation:req.body.postLocation,
                postDate:new Date(),
                photo:photo

            });
        }else{
            var photo={
                    fileName:req.body.photo.fileName,
                    fileType:req.body.photo.fileType,
                    value:req.body.photo.value
                };

            account.posts.push(
            {   
                postAvatar:account.avatarURL,
                postUserId:account._id,
                postUserName:account.userName,
                postNickName:account.nickName,
                title:req.body.title,
                review:req.body.review,
                postLocation:req.body.postLocation,
                postDate:new Date(),
                photo:photo
                
                
            });
        }
 

    account.save().then(() => {
         res.status(200).send({ message: 'Posts created successfully'});
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Posts."
        });
    });
};    

 //update cover image      
  exports.postCover = (req,res) => {
      Account.findOne({ userName: req.params.userName })
    .then(account => {
        if(!account) {
            return res.status(401).send({
                message: "Account not found with email " + req.params.userName
            });            
        }
       Account.findOneAndUpdate({userName:req.params.userName},{$set:{
            imgCover : req.body.imgCover
          
            
             }},{new:true}).then((docs)=>{
            if(docs) {
                res.status(200).send({ message: 'Cover updated successfully'});

             } else {
                return res.status(400).send({
                'message' : "Your userName is not exist"
                });
             }
        }).catch((err)=>{
             return res.status(500).send({
                message: err.message || "Some error occurred while creating the cover."
             });
         })


    });
}
//Get all users
exports.getUsers = (req,res)=> {
    Account.find({},(error,allUsers) => {
        allUsers.sort((a,b) => {
            return b.posts.length - a.posts.length;
        });

        res.status(200).send({'allUsers':allUsers});
    });
}
//Get all posts
exports.getPosts = (req,res) => {
    let allPosts = [];
    Account.find({},(error,users) =>{
        var i = 0;
        while(i < users.length){
            var j = 0;
            while(j < users[i].posts.length){
                allPosts.push(users[i].posts[j]);
                j++;
            }
            i++;
        }
        
        allPosts.sort((a,b) => {
            return b.postDate - a.postDate;
        });
        res.status(200).send({'allPosts':allPosts});
    });
}

// Delete a post with the specified userName and postId in the request
exports.deletePost = (req, res) => {
    Account.findOne({ userName: req.params.userName })
    .then(account => {
        if(!account) {
            return res.status(401).send({
                message: "Account not found with email " + req.params.userName
            });
        }
        let post = account.posts.id(req.params.postId);
        if(!post) {
            return res.status(401).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        post.remove();
        account.save().then(() => {
            res.status(204).send({ message: 'Post deleted successfully'});   
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while deleting the post."
        });
    });
};
