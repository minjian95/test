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
import { stringify } from 'querystring';
@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  userObject: object;
  userId:string;
  userName: string;
  avatar: string;
  nickName: string;
  password: string;
  location:string;
  description:string;
  date:any;
  registerDate:any;
  currentUserId:string;
  posts: any;
  postsCount:number;
  message: any;
  model: any = {};
  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  
  loading: boolean = false;


  selectedFile: File = null;


  searchText;
  cities = [
    { name: 'Athens',},
    { name: 'Beijing' },
    { name: 'Berlin' },
    { name: 'Boston' },
    { name: 'Floence' },
    { name: 'Hong Kong' },
    { name: 'Liboa' },
    { name: 'Los Angeles' },
    { name: 'Melbourne' },
    { name: 'Mumbai'},
    { name: 'New Delhi'},
    { name: 'New York'},
    { name: 'Osaka'},
    { name: 'Pairs'},
    { name: 'Rio'},
    { name: 'Roma'},
    { name: 'San diego'},
    { name: 'San Francisco'},
    { name: 'Seattle'},
    { name: 'Shang Hai'},
    { name: 'Sydney'},
    { name: 'Thailand'},
    { name: 'Tokyo'},
    { name: 'London'},
    { name: 'Wien'}

  ];
  onAvatarChange(event) {
    var file = event.target.files[0];
    if (!file.type.match("image.*")) {
      return false;
    }
    this.selectedFile = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var src = reader.result;
      $("#avatarPreview").attr("src",src.toString());
      
      this.form.get('avatarURL').setValue(
         reader.result.toString()
      )
      this.model.avatarURL=this.form.value['avatarURL'];
      console.log(this.model);
    };
}
  createForm() {
    this.form = this.fb.group({
      avatarURL:null
    });
  }
  constructor(private fb: FormBuilder, private http: HttpClient,private userService: UserService, private router: Router, public modalService: NgbModal) {
    this.createForm();
    
   }

  ngOnInit() {
    
    this.userObject = JSON.parse(localStorage.getItem('user'));
    if (this.userObject != null) {
      this.userId = this.userObject['_id'];
      
      this.userName = this.userObject['userName'];
      this.avatar = this.userObject['avatarURL'];
      this.nickName = this.userObject['nickName'];
      this.password = this.userObject['password'];
      
      this.location = this.userObject['location'];
      this.description = this.userObject['description'];
      this.posts = this.userObject['posts'];
      this.postsCount = this.posts.length;
      this.registerDate = moment(this.userObject['registerDate']).format("MMM YYYY"); 
      this.model={
        nickName:this.nickName,
        userName:this.userName,
        password:this.password,
        repassword:this.password,
        location:this.location,
        description:this.description,
        avatarURL:this.avatar
      }
  }

}


  updateUser(content){
    this.userService.updateUser(this.userName,this.model).subscribe(
      data => {
        //this.router.navigate(['homePage']);
        console.log(this.model);
        
        this.message = "";
        //$("#close").click();
        
        this.updateLocal(this.userId);
        
        // location.replace(location.href);
        location.reload(true);
        jQuery("#profileModall").modal("hide");
        
        
        
      },
      error => this.message = {
        type: 'error',
        text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
      }
    )
}

updateLocal(userId){
  this.userService.updateLocal(userId)
  .subscribe(
    data => {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data['user']));
    },error => this.message = {
      type: 'error',
      text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
    });
}


showPlaceList(){
  let a = document.getElementById("placeList");
  a.style.display = "block";
}

hidePlaceList(){
  let a = document.getElementById("placeList");
  a.style.display= "none"; 
}

finshLocation(cityName){
  this.model.location=cityName;
  this.hidePlaceList()
}
}
