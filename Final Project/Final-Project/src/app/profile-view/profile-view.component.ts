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
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  
  targetUserObject: object;
  targetUserId:string;
  targetUserName: string;
  targetAvatar: string;
  targetNickName: string;
  targetLocation:string;
  targetDescription:string;
  targetImgCover:string;
  
  targetRegisterDate:any;
  targetPosts: any;
  targetPhotos: any;
  targetPostsCount:number;
  message: any;
  allUsers:any;
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
      this.form.get('targetImgCover').setValue(
         reader.result.toString()
      )
      this.model=this.form.value;
      console.log(this.model);
      this.userService.postCover(this.targetUserName,this.model).subscribe(
        data => {
          this.message = "";
        //$("#close").click();
        
        
        this.updateLocal(this.targetUserId);

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
      targetImgCover:null
    });
  }
  constructor(private fb: FormBuilder, private http: HttpClient,private userService: UserService, private router: Router, public modalService: NgbModal) {
    this.createForm();
    this.targetPhotos=[];
    this.allUsers=[];
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
      }
    )
    console.log(JSON.parse(localStorage.getItem('targetUser')));
    this.targetUserObject = JSON.parse(localStorage.getItem('targetUser'));
    
    if (this.targetUserObject != null) {
      this.targetUserId = this.targetUserObject['_id'];
      this.updateLocal(this.targetUserId);
    }
      
    
    


  }
  updateLocal(targetUserId){
    this.userService.updateLocal(targetUserId)
    .subscribe(
      data => {
        localStorage.removeItem('targetUser');
        localStorage.setItem('targetUser', JSON.stringify(data['user']));
        this.targetUserObject = JSON.parse(localStorage.getItem('targetUser'));

        this.targetUserName = this.targetUserObject['userName'];
      this.targetAvatar = this.targetUserObject['avatarURL'];
      this.targetNickName = this.targetUserObject['nickName'];
      this.targetLocation = this.targetUserObject['location'];
      this.targetDescription = this.targetUserObject['description'];
      this.targetImgCover = this.targetUserObject['imgCover'];
      $("#cover-div").css("background-image",
      'url('+ this.targetImgCover+')');
      this.targetPosts = this.targetUserObject['posts'].reverse();

      this.targetPostsCount = this.targetPosts.length;
      this.targetRegisterDate = moment(this.targetUserObject['registerDate']).format("MMM YYYY"); 
      
      
      if(this.targetPosts.length > 0){
        $("#hint").hide();
      }

      var i = 0;
      while(i <= this.targetPosts.length-1){
        var postDate = moment(this.targetPosts[i]['postDate']).format("MMM Do YYYY HH:mm"); 
        this.targetPosts[i]['postDate'] = postDate ;
        this.targetPhotos.push(this.targetPosts[i].photo);
        i++;
      }
      
      },error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      });
  }

  opentargetPhotoshowModal(url){
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
        
        this.router.navigate(['profile-view']);
        
      },error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      });
  }
}
