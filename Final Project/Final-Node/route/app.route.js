module.exports = (app) => {
    const account = require('../controller/accountController')


    //user sign up, ceate account for user
    app.post('/user/create', account.createAcc);
    //user log in,
    app.get('/user/:userName/:password', account.checkAcc);
    //user update info
    app.post('/user/:oldUserName/update', account.updateAcc);
    //get user
    app.get('/user/:id/', account.getUser);

    //submit post
    app.post('/user/:userName/post',account.createPost);
    
    //update cover image
    app.post('/user/:userName/postCover',account.postCover);
    
    //get all posts
    app.get('/posts',account.getPosts);
    
    //get all users
    app.get('/users',account.getUsers);
    
    // Delete a post with id
    app.delete('/user/:userName/posts/:postId', account.deletePost);
}