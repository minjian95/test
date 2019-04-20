import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  HttpClient
} from '@angular/common/http';
import * as $ from 'jquery';
import * as moment from 'moment';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userObject: object;
  currentUserName: string;
  userId:string;
  avatar: string;
  location:string;
  currentNickName: string;
  postsCount:number;
  message:any;
  allPosts:any;
  allUsers:any;
  constructor(private http: HttpClient, private userService : UserService,private router: Router, public modalService: NgbModal) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  {
      return false;
    };
    this.allPosts = [];
    this.allUsers = [];
  }

  ngOnInit() {

    this.userService.getUsers()
    .subscribe(
      data => {
        var users = data['allUsers'];
        var i = 0;
        while(i<3){
          this.allUsers.push(users[i]);
          i++;
        }
        console.log(this.allUsers);
      }
    )

    this.userService.getPosts()
    .subscribe(
    data => {
      this.allPosts = data['allPosts'];
      var i = 0;
      while(i <= this.allPosts.length-1){
        var postDate = moment(this.allPosts[i]['postDate']).format("MMM Do YYYY HH:mm"); 
        this.allPosts[i]['postDate'] = postDate ;
        i++;
      }
    },
     error => this.message=""
    );

    console.log(this.allPosts);
    this.userObject = JSON.parse(localStorage.getItem('user'));
    
    if (this.userObject != null) {
      this.updateLocal(this.userId);
      this.userId = this.userObject['_id'];
      this.updateLocal(this.userId);

      
    }
  
  }


  updateLocal(userId){
    this.userService.updateLocal(userId)
    .subscribe(
      data => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(data['user']));
        this.userObject = JSON.parse(localStorage.getItem('user'));
        this.currentUserName = this.userObject['userName'];
        this.avatar = this.userObject['avatarURL'];
        this.location = this.userObject['location'];
        this.currentNickName = this.userObject['nickName'];
        this.postsCount = this.userObject['posts'].length;
        console.log(this.userObject);
      },error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      });
  }


  openPhotoShowModal(url){
    $("#showImg").attr("src",url);
  }

  getTargetUser(userId){
    this.userService.updateLocal(userId)
    .subscribe(
      data => {
        localStorage.removeItem('targetUser');
        localStorage.setItem('targetUser', JSON.stringify(data['user']));
       
        var targetUserObject = JSON.parse(localStorage.getItem('targetUser'));
        var targetUserId = targetUserObject['_id'];
        if(this.userId!=targetUserId){
        this.router.navigate(['profile-view']);
        }else{
        this.router.navigate(['profile']);
        }
      },error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      });
  }
}
