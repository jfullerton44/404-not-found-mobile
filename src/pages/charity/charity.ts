import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ProjectPage } from '../project/project';
import { ConfigService } from '../../config.service';
import { PaymentOptionsPage } from '../payment-options/payment-options';

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
  projects = [];
  paymentID;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private alertCtrl : AlertController,
    public modalCtrl: ModalController,
    public configService: ConfigService
  ) {
    this.charity = this.navParams.get('charity');
    this.getProjects();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CharityPage');
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
            let modal = this.modalCtrl.create(PaymentOptionsPage);
            modal.onDidDismiss(pm_id => {
              this.paymentID = pm_id;
              this.addDonation(this.storage);
            })
            modal.present();
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
        .get(this.configService.getBaseUrl() + "/users", {
         
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
              .post(this.configService.getBaseUrl() + "/donations", {
                charity_id: this.charity.id as number,
                amount_donated: amount as number,
                date: new Date().toISOString(),
                user_id: this.userId as number,
                pm_id: this.paymentID as number
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

  getProjects(){
    this.http.get(this.configService.getBaseUrl() + `/charities/${this.charity.id}/projects`)
    .subscribe(
      result => {
        result.json().forEach((project) => {
          this.projects.push(project);
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  openProjectDetails(project){
    let modal = this.modalCtrl.create(ProjectPage, {charity: this.charity, project: project});
    modal.present();
  }

}


