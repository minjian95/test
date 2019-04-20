import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/user.service';
import { Router} from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message : any;
  model : any = {};
  constructor(private userService: UserService, private router: Router, public modalService: NgbModal) { }

  ngOnInit() {
  }

  onSubmit(content){
    this.userService.getUser(this.model)
    .subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data['user']));
        
        // this.router.navigate(['homePage']);
        
        
        this.message="";
        //$("#close").click();
        jQuery("#LoginModal").modal("hide");
        this.modalOpen(content);
      },
      error => this.message = {type : 'error', text : JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":')+19, JSON.stringify(error).indexOf('"}}'))} 
    )
  }

  modalOpen(content){
    this.modalService.open(content);
  }
  navigateToHome(){
    this.router.navigate(['homePage']);
    
  }
}
