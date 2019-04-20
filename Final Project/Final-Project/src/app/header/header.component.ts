import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  userObject: object;
  currentUser: string;
  avatar: string;
  currentNickName: string;
  constructor(private router: Router, public modalService: NgbModal) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  {
      return false;
    };
   
    
}

  ngOnInit() {
    this.userObject = JSON.parse(localStorage.getItem('user'));
    if (this.userObject != null) {
      this.currentUser = this.userObject['userName'];
      this.avatar = this.userObject['avatarURL'];
      this.currentNickName = this.userObject['nickName'];
    }
    
    
  }

  logout(wanttologout) {
    this.modalService.open(wanttologout, {
    }).result.then((result) => {
      if (result === 'yes') {
        localStorage.removeItem('user');
        localStorage.removeItem('targetUser');
         this.router.navigateByUrl('/');
       } else {
         return;
       }
     });
  }

}
