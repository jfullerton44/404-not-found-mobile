import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CharityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charity',
  templateUrl: 'charity.html',
})
export class CharityPage {
  donationAmount: number;
  charity: Charity;
  jwt: string;
  userId: number;
  username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private alertCtrl : AlertController
  ) {
    this.charity = this.navParams.get('charity');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharityPage');
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm donation',
      message: 'Are you sure you want to donate $' + this.donationAmount + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Donate',
          handler: () => {
            console.log('Buy clicked');
            this.addDonation(this.storage);
          }
        }
      ]
    });
    alert.present();
  }

donationSuccessful() {
    let alert = this.alertCtrl.create({
      title: 'Donation Successful',
      subTitle: 'Thank you for donating',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  addDonation(storage: Storage) {
    var amount: number;
    amount = +this.donationAmount;

    storage.get('jwt').then((val) => {
      this.jwt = val;
      this.http
        .get("http://localhost:3000/users", {
          params: {
            jwt: this.jwt
          }
        })
        .subscribe(
          result => {
            let tUser = result.json().user;
            this.userId = tUser.id;
            this.username = tUser.username

            this.http
              .post("http://localhost:3000/donations", {
                charity_id: this.charity.id,
                amount_donated: amount,
                date: new Date().toISOString(),
                user_id: this.userId
              })
              .subscribe(
                result => {
                  this.donationSuccessful();
                },
                error => {
                  console.log(error);
                }
              );

          },
          error => {
            console.log(error);
          }
        );
    });

  }
}


