import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  UserService
} from '../service/user.service';
import {
  Router
} from '@angular/router';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  HttpClient
} from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import * as $ from 'jquery';
import * as moment from 'moment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userObject: object;
  userId:string;
  userName: string;
  avatar: string;
  nickName: string;
  location:string;
  description:string;
  imgCover:string;
  date:any;
  registerDate:any;
  posts: any;
  photos: any;
  postsCount:number;
  message: any;
  model: any = {};
  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;


  loading: boolean = false;
  selectedFile: File = null;
  


  onCoverChange(event) {
    var file = event.target.files[0];
    if (!file.type.match("image.*")) {
      return false;
    }
    this.selectedFile = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var src = reader.result;
      
      // $("#drop_zone").css("min-height", "0");
      // $("#label-img").empty();
      $("#cover-div").css("background-image",
      'url('+ src+')');
      
      // $("#retry").show();
      // $("#drop_box").hide();
      this.form.get('imgCover').setValue(
         reader.result.toString()
      )
      this.model=this.form.value;
      console.log(this.model);
      this.userService.postCover(this.userName,this.model).subscribe(
        data => {
          this.message = "";
        //$("#close").click();
        
        
        this.updateLocal(this.userId);

      },
      error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      }
    )
    };
}
  createForm() {
    this.form = this.fb.group({
      imgCover:null
    });
  }
  constructor(private fb: FormBuilder, private http: HttpClient,private userService: UserService, private router: Router, public modalService: NgbModal) {
    this.createForm();
    this.photos=[];
  }

  ngOnInit() {
    
    console.log(JSON.parse(localStorage.getItem('user')));
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

        this.userName = this.userObject['userName'];
      this.avatar = this.userObject['avatarURL'];
      this.nickName = this.userObject['nickName'];
      this.location = this.userObject['location'];
      this.description = this.userObject['description'];
      this.imgCover = this.userObject['imgCover'];
      $("#cover-div").css("background-image",
      'url('+ this.imgCover+')');
      this.posts = this.userObject['posts'].reverse();

      this.postsCount = this.posts.length;
      this.registerDate = moment(this.userObject['registerDate']).format("MMM YYYY"); 
      
      
      if(this.posts.length > 0){
        $("#hint").hide();
      }

      var i = 0;
      while(i <= this.posts.length-1){
        var postDate = moment(this.posts[i]['postDate']).format("MMM Do YYYY HH:mm"); 
        this.posts[i]['postDate'] = postDate ;
        this.photos.push(this.posts[i].photo);
        i++;
      }
      },error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      });
  }

  openPhotoShowModal(url){
    
    $("#showImg").attr("src",url);
  }

  openImg(url){
    console.log(url);
    let pdfWindow = window.open("")
    pdfWindow.document.write("<iframe width='100%' height='100%' src=' " + encodeURI(url) + "'></iframe>")
  }

  getTargetUser(userId){
    this.userService.updateLocal(userId)
    .subscribe(
      data => {
        localStorage.removeItem('targetUser');
        localStorage.setItem('targetUser', JSON.stringify(data['user']));
        //console.log(JSON.parse(localStorage.getItem('targetUser')));
        //alert();
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


deletePost(wanttodeletePost,postID) {
  this.modalService.open(wanttodeletePost, {
  }).result.then((result) => {
    if (result === 'yes') {
      let postId = postID;
      console.log(postId);
      console.log(this.userName);
      this.userService.deletePost(this.userName, postId)
      .subscribe(
          data => {
          this.message = "";
          this.updateLocal(this.userId);
          location.replace(location.href);
        },
        error => this.message = {
          type: 'error',
          text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
        });
    }else{
      return;
    }
  });
}




}