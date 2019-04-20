import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message: any;
  model: any = {};
  constructor(private userService: UserService, private router: Router, public modalService: NgbModal) { }

  ngOnInit() {
  }

  creteUser(content) {
    this.userService.create(this.model)
      .subscribe(
        data => {
          //this.message = {type: 'success', text: "you are now the one of million!"}
          this.storeUser();
          //$("#close1").click();
          this.message ="";
          jQuery("#modalSignUp").modal("hide");
          this.openModal(content);
      },
        error => this.message = {type : 'error', text : JSON.stringify(error).substring(JSON.stringify(error).indexOf('error":{"message":')+19, JSON.stringify(error).indexOf('"}}'))}
      );
  }
  storeUser(){
    this.userService.getUser(this.model)
    .subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data['user']));
        // this.router.navigate(['homePage']);
      });
  }
  openModal(content){
    this.modalService.open(content);
  }
  navigateToHome(){
    this.router.navigate(['homePage']);
    
  }
}
