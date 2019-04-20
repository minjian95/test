import { Component, OnInit } from '@angular/core';

declare let paypal: any

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 120;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AewuDIFxuW7epwar4QOPvuwijC24RwB2ZKuzIiaRsggjC0T2U65QEEpcUGuX6bYfi4mQ1HjgkmnxkpC9',
      production: 'something'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}
