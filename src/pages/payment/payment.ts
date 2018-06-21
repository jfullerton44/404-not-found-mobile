import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var Stripe;

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  stripe = Stripe('pk_test_XoMg67WscqYcJqIw6Ihla35M');
  card: any;
  jwt: string;
  user;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public configService: ConfigService, public storage: Storage) {
    storage.get('jwt').then((val) => {
      this.jwt = val;
      this.http
        .get(this.configService.getBaseUrl() + "/users", {
          params: {
            jwt: this.jwt
          }
        })
        .subscribe(
          result => {
            let tUser = result.json().user;
            this.user= tUser;
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          let s = result.source;
          this.http.post(this.configService.getBaseUrl() + "/payment_method", {
            user_id: Number(this.user.id),
            lastFourCardNum: s.card.last4,
            cardToken: s.id
          }).subscribe(
            result => {
              console.log("Payment method posted: ", result);
            },
            error => {
              console.log(error);
            }
          )
        }
      });
    });
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
}

