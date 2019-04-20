import { Component, OnInit, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core';
// import { template } from '@angular/core/src/render3';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-post-card',
  // templateUrl: './post-card.component.html',
  template: '<template #alertContainer></template>',
  
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public modalService: NgbModal) { }
  message:any;
  userObject: object;
  userName: string;
  avatar: string;
  nickName: string;
  date:any;
  registerDate:any;
  currentUserId:string;
  posts: any;
  postsCount:number;
  @Input() type: string = "success";

  ngOnInit() {
    this.updateLocal();
    console.log(JSON.parse(localStorage.getItem('user')));
    this.userObject = JSON.parse(localStorage.getItem('user'));
    if (this.userObject != null) {
      this.currentUserId = this.userObject['_id'];
      this.userName = this.userObject['userName'];
      this.avatar = this.userObject['avatarURL'];
      this.nickName = this.userObject['nickName'];
      this.posts = this.userObject['posts'];
      this.postsCount = this.posts.length;
      this.registerDate = moment(this.userObject['registerDate']).format("MMM Do YYYY"); 
      
      console.log(this.posts.length);
      var i = this.posts.length-1;
      if(i>-1){
        $("#hint").hide();
      }
      while(i >= 0){
        
        var postDate = moment(this.posts[i]['postDate']).format("MMM Do YYYY HH:mm"); 
        if(this.posts[i].photo==null){
        let card = document.createElement('div'); 
        card.className="card";
        card.setAttribute("style","margin-bottom:18px")
        card.innerHTML=
        "<div class='card' style='margin-bottom:18px'>"+
        "<div class='' style='height:20px'></div>"+
        "<div class='row' style='margin-bottom:5px;'>"+
                "<div align='center' class=' col-3 col-md-2' style='padding-right:0'>"+
                  "<a href=''><img src="+ this.avatar +" class='rounded-circle' width='60%'></a>"+
                "</div>"+
              "<div class='avatar2 col-5 col-md-6' style='padding-left:0'>"+
                    "<a href='' class='userName'>" + this.nickName + "<i class='fa fa-star' aria-hidden='true'></i></a>"+
                    "<p class='p date'>"+ postDate +"</p>"+
              "</div>"+
              "<div align='right' class='avatar2 col-4 col-md-4'>"+
                  "<a href='javascript:void(0);' class='href'><span><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;Follow</span></a>"+
                  "<a href='javascript:void(0);' class='href' [popover]='popReport' placement='bottom' triggers='click' [outsideClick]='true'><span><i class='fa fa-ellipsis-h' aria-hidden='true'></i></span></a>"+
            "</div>"+
          "</div>"+
      
      "<div class='post-img'></div>"+
      "<div class='card-body'>"+
        "<h4>"+ this.posts[i].title + "</h4>"+
        "<p style='overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;white-space: normal;'>"+
        this.posts[i].review +
        "</p>"+
      "</div>"+
      "<div class='share-area container-fluid'>"+
        "<div style='margin-top:5px'>"+
          "<span class='likes underline' ><a href='' style='color:grey'><span>123</span> &nbsp;Likes</a></span>"+
          "<span class='reports underline' ><a href='' style='color:grey'><span>12</span> &nbsp;Reposts</a></span>"+
          "<hr style='margin-top:5px;margin-bottom:0px'>"+
        "<div style='margin-top:5px;margin-bottom:5px'>"+
            "<a href='' class='href'><span style='margin-left: 10px'><i class='fa fa-thumbs-up' aria-hidden='true'></i>&nbsp;Likes</span></a>"+
            "<a href='' class='href'><span style='margin-left: 10px'><i class='fa fa-share' aria-hidden='true'></i>&nbsp;Share</span></a>"+
        "</div>"+
       "</div>"+
      "</div>"+
      "</div>";

        
        $("#posts-box").append(card);
        i--;
      }else{
        let card = document.createElement('div'); 
        card.className="card";
        card.setAttribute("style","margin-bottom:18px")
        card.innerHTML="<div class='' style='height:20px'></div>"+
        "<div class='row' style='margin-bottom:5px;'>"+
                "<div align='center' class=' col-3 col-md-2' style='padding-right:0'>"+
                  "<a href=''><img src="+ this.avatar +" class='rounded-circle' width='60%'></a>"+
                "</div>"+
              "<div class='avatar2 col-5 col-md-6' style='padding-left:0'>"+
                    "<a href='' class='userName'>" + this.nickName + "<i class='fa fa-star' aria-hidden='true'></i></a>"+
                    "<span class='date'>post a photo</span>"+
                    "<p class='p date'>"+ postDate +"</p>"+
              "</div>"+
              "<div align='right' class='avatar2 col-4 col-md-4'>"+
                  "<a href='javascript:void(0);' class='href'><span><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;Follow</span></a>"+
                  "<a href='javascript:void(0);' class='href' [popover]='popReport' placement='bottom' triggers='click' [outsideClick]='true'><span><i class='fa fa-ellipsis-h' aria-hidden='true'></i></span></a>"+
            "</div>"+
          "</div>"+
      
      "<div align='center' class='post-img' style='max-height:500px'><a href='javascript:void(0);' onClick)='openModal()'><img src='"+ this.posts[i].photo.value +"' style='max-height:500px; width:auto;'></a></div>"+
      "<div class='card-body'>"+
        "<h4>"+ this.posts[i].title + "</h4>"+
        "<p style='overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;white-space: normal;'>"+
        this.posts[i].review +
        "</p>"+
      "</div>"+
      "<div class='share-area container-fluid'>"+
        "<div style='margin-top:5px'>"+
          "<span class='likes underline' ><a href='' style='color:grey'><span>123</span> &nbsp;Likes</a></span>"+
          "<span class='reports underline' ><a href='' style='color:grey'><span>12</span> &nbsp;Reposts</a></span>"+
          "<hr style='margin-top:5px;margin-bottom:0px'>"+
        "<div style='margin-top:5px;margin-bottom:5px'>"+
            "<a href='' class='href'><span style='margin-left: 10px'><i class='fa fa-thumbs-up' aria-hidden='true'></i>&nbsp;Likes</span></a>"+
            "<a href='' class='href'><span style='margin-left: 10px'><i class='fa fa-share' aria-hidden='true'></i>&nbsp;Share</span></a>"+
        "</div>"+
       "</div>"+
      "</div>";
      $("#posts-box").append(card);
      i--;
        

      }
    }
  }

  }
  updateLocal(){
    var userObject = JSON.parse(localStorage.getItem('user'));
    var userName = userObject['userName'];
    this.userService.updateLocal(userName)
    .subscribe(
      data => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(data['user']));
      },error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      });
  }

  openModal(){
    alert(0);
    $("#postModal").show();
  }

  
}
