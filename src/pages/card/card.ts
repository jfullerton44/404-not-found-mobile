import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  jwt: string;
  user;
  cardArr = [];

  constructor(public storage: Storage, public http: Http, public configService: ConfigService) {
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
        this.cardArr = result.json();
      },
      error => {
        console.log(error);
      }
    )
  }
  
}
