import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  moreTeams(){
    if($("#moreTeams").text() == "More Teams"){
    $(".hide-card").show();
    $("#moreTeams").text("Less Categories");
    }else{
      $(".hide-card").hide();
    $("#moreTeams").text("More Teams");
    }

  }
  
}
