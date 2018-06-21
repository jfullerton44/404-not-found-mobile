import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var Stripe;
@IonicPage()
@Component({
  selector: 'page-payment-options',
  templateUrl: 'payment-options.html',
})
export class PaymentOptionsPage {
  jwt: string;
  user;
  sources = [];
  pm_idArr = [];
  indexArr = [];
  stripe = Stripe('pk_test_XoMg67WscqYcJqIw6Ihla35M');

  constructor(public viewCtrl: ViewController, public storage: Storage, public http: Http, public configService: ConfigService) {
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
            this.user = result.json().user;
            this.getCards()
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  ionViewDidLoad() {
  }

  getCards(){
    this.http.get(this.configService.getBaseUrl() + `/users/${this.user.id}/payment_methods`).subscribe(
      result => {
        let cards = result.json();
        console.log(cards);
        let index = 0;
        cards.forEach((card) => {
          this.stripe.retrieveSource({
            id: card.cardSource,
            client_secret: card.clientID
          }).then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            }
            else{
              this.sources.push(result.source);
              this.pm_idArr.push(card.id);
              this.indexArr.push(index);
              index++;
            }
          });
        })
      },
      error => {
        console.log(error);
      }
    )
  }
  
  closeModal(pm_id){
    this.viewCtrl.dismiss(Number(pm_id));
  }
}