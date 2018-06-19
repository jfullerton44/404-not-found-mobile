import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ProjectPage } from '../project/project';
import { ConfigService } from '../../config.service';

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
            //console.log('Buy clicked');
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
        .get(this.configService.getBaseUrl() + "/users", {
          //.get("http://localhost:3000/users", {
          params: {
            jwt: this.jwt
          }
        })
        .subscribe(
          result => {
            
            let tUser = result.json().user;
            //console.log(tUser);
            this.userId = tUser.id;
            //console.log(this.userId);
            this.username = tUser.username

            this.http
              .post(this.configService.getBaseUrl() + "/donations", {
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


