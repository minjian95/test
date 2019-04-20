import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Post } from '../model/post.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post('http://localhost:3000' + '/user/create' , user );
  }

  getUser(user: User) {
    return this.http.get('http://localhost:3000' + '/user/'+ user.userName + '/' + user.password);
  }
  
  createPost(userName:string,post:Post){
    return this.http.post('http://localhost:3000' +'/user/' + userName +'/post', post);
    }

  updateLocal(id:string){
    return this.http.get('http://localhost:3000' + '/user/'+ id);
  }

  updateUser(oldUserName:string,user:User){
    return this.http.post('http://localhost:3000' + '/user/'+ oldUserName + '/update',user);
  }

  postCover(userName:string,user:User){
    return this.http.post('http://localhost:3000' + '/user/'+ userName + '/postCover',user);
  }

  getPosts(){
    return this.http.get('http://localhost:3000/posts');
  }

  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }

  deletePost(userName:string, postId:string) {
    return this.http.delete('http://localhost:3000' + '/user/' + userName + '/posts/' + postId);
  }

}
