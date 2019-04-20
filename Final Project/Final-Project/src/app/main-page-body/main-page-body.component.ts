import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-page-body',
  templateUrl: './main-page-body.component.html',
  styleUrls: ['./main-page-body.component.css']
})

export class MainPageBodyComponent implements OnInit {

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
  constructor(private router: Router, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit() {
    jQuery(document).ready(()=>{
      jQuery("#item1").mouseenter(()=>{
        jQuery("#link1").css("display","inline-block")
      });
      jQuery("#item1").mouseout(()=>{
        jQuery("#link1").css("display","none")
      });
      jQuery("#item2").mouseenter(()=>{
        jQuery("#link2").css("display","inline-block")
      });
      jQuery("#item2").mouseout(()=>{
        jQuery("#link2").css("display","none")
      });
      jQuery("#item3").mouseenter(()=>{
        jQuery("#link3").css("display","inline-block")
      });
      jQuery("#item3").mouseout(()=>{
        jQuery("#link3").css("display","none")
      });
      jQuery("#item4").mouseenter(()=>{
        jQuery("#link1").css("display","inline-block")
      });
      jQuery("#item4").mouseout(()=>{
        jQuery("#link1").css("display","none")
      });
    })
  }

  showPlaceList(){
    let a = document.getElementById("placeList");
    a.style.visibility = "visible";
  }

  hidePlaceList(){
    let a = document.getElementById("placeList");
    a.style.visibility = "hidden"; 
  }

  search(){
    let b = document.getElementsByTagName("input")[0].value;
    this.router.navigate([b]);
  }
  

}

