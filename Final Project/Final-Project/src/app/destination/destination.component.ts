import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})

export class DestinationComponent implements OnInit {
  searchText;
  places = [
    { name: 'Abu Dhabi',},
    { name: 'Afghanistan' },
    { name: 'Algeria' },
    { name: 'Argentina' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Brazil' },
    { name: 'Cameroon' },
    { name: 'Canada' },
    { name: 'Cape Verde'},
    { name: 'Caribbean Sea'},
    { name: 'Chile'},
    { name: 'China'},
    { name: 'Colombia'},
    { name: 'Comoros'},
    { name: 'Congo'},
    { name: 'Daegu Reef'},
    { name: 'Denmark'},
    { name: 'Dubai'},
    { name: 'Egyp'},
    { name: 'Ethiopia'},
    { name: 'Fiji'},
    { name: 'Finland'},
    { name: 'France'},
    { name: 'Germany'},
    { name: 'Ghana'},
    { name: 'Gold Coas'},
    { name: 'Guatemala'},
    { name: 'Guatemala'},
    { name: 'Guinea'},
    { name: 'Honduras'},
    { name: 'Iceland'},
    { name: 'India'},
    { name: 'Iraq'},
    { name: 'Ireland'},
    { name: 'Israel'},
    { name: 'Italy'},
    { name: 'Jerusalem'},
    { name: 'Jordan'},
    { name: 'Kenya'},
    { name: 'Korea'},
    { name: 'Kuwait'},
    { name: 'Lebanon'},
    { name: 'Libya'},
    { name: 'Madagascar'},
    { name: 'Malaysia'},
    { name: 'Maldives'},
    { name: 'Mauritius'},
    { name: 'Mexico'},
    { name: 'Myanmar'},
    { name: 'Nauru'},
    { name: 'Nepal'},
    { name: 'Netherlands'},
    { name: 'new Zealand'},
    { name: 'Niue'},
    { name: 'Norway'},
    { name: 'Pakistan'},
    { name: 'Palau'},
    { name: 'Panama'},
    { name: 'Paraguay'},
    { name: 'Peru'},
    { name: 'Philippines'},
    { name: 'Portugal'},
    { name: 'ran'},
    { name: 'Russia'},
    { name: 'Rwanda'},
    { name: 'Saipan'},
    { name: 'Samoa'},
    { name: 'Saudi Arabia'},
    { name: 'Sharjah'},
    { name: 'Singapore'},
    { name: 'Sri Lanka'},
    { name: 'Switzerland'},
    { name: 'Syria'},
    { name: 'Tahiti'},
    { name: 'Tehran'},
    { name: 'Thailand'},
    { name: 'Tonga'},
    { name: 'Turkey'},
    { name: 'Ukraine'},
    { name: 'United States'},
    { name: 'Uruguay'},
    { name: 'Vanuatu'},
    { name: 'Vietnam'},
    { name: 'Wake Island'},
    { name: 'Zimbabwe'},  
    
  ];
  constructor(private router: Router) { }

  ngOnInit() {
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
