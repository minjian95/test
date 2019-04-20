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
@Component({

  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit  {
  userObject: object;
  userId:string;
  userName: string;
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

  onFileChange(event) {
    console.log(event);
    var file = event.target.files[0];
    if (!file.type.match("image.*")) {
      return false;
    }
    this.selectedFile = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var src = reader.result;
      var img = '<img id="preview" class="img-fluid" src="' + src + '"  style="max-height:500px; width:auto;" alt="preview"/>';
      $("#drop_zone").css("min-height", "0");
      $("#preview_box").empty().append(img);
      $("#retry").show();
      $("#drop_box").hide();
      this.form.get('photo').setValue({
        fileName: file.name,
        fileType: file.type,
        value: reader.result.toString()
      })
      this.model=this.form.value;
      console.log(this.model);

    };
}
  createForm() {
    this.form = this.fb.group({
      photo:null
    });
  }
  // onUpload(){
  //   this.http.post('');
  // }

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService, private router: Router, public modalService: NgbModal) {
    this.createForm();
  
    this.model={
    postLocation:""
    };
  }
  ngOnInit() {
    
    this.userObject = JSON.parse(localStorage.getItem('user'));
    
    if (this.userObject != null) {
      this.userName = this.userObject['userName'];
      this.userId = this.userObject['_id'];
      this.updateLocal(this.userId);
      console.log(this.userName);
    }

    this.form.get('photo').setValue({
      fileName: ""
    })
    
  }
  
  onSubmit(content) {
    
    this.userService.createPost(this.userName, this.model)
      .subscribe(
        data => {
          //this.router.navigate(['homePage']);
          console.log(this.model);
          
          this.message = "";
          //$("#close").click();
          
          
          this.updateLocal(this.userId);

          location.replace(location.href);
          // location.reload(true);
          
          jQuery("#postModal").modal("hide");
          jQuery("#photoModal").modal("hide");
          
          //this.refresh();
        },
        error => this.message = {
          type: 'error',
          text: JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":') + 19, JSON.stringify(error).indexOf('"}}'))
        }
      )
  }



  resetPhoto() {
    this.selectedFile = null;
    $("#drop_zone").css("min-height", "200px");
    $("#preview_box").empty();
    $("#retry").hide();
    $("#drop_box").show();
    $("#img_input").val(null);
  }


  refresh(){
    location.reload(true);
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
    let a = document.getElementById("placeList1");
    let b = document.getElementById("placeList2");
    a.style.display = "block";
    b.style.display = "block";
  }

  hidePlaceList(){
    let a = document.getElementById("placeList1");
    let b = document.getElementById("placeList2");
    a.style.display= "none"; 
    b.style.display= "none"; 
  }

  finshLocation(cityName){
    this.model.postLocation=cityName;
    this.hidePlaceList()
  }
}
