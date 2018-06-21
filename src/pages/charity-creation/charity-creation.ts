import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfigService } from '../../config.service';
import { Http } from '@angular/http';

/**
 * Generated class for the CharityCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charity-creation',
  templateUrl: 'charity-creation.html',
})
export class CharityCreationPage {
  name: string;
  description: string;
  descriptionFull: string;
  email:string;
  photoLink: string;
  photoLink2: string;
  phone: string;
  website: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService,
    public http: Http,
    private alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
  }

  registerNewCharity(){

      this.http
        .post(this.configService.getBaseUrl() + "/charityReg", {
          name: this.name,
          description:this.description,
          descriptionFull:this.descriptionFull,
          email: this.email,
          photoLink: this.photoLink,
          photoLink2: this.photoLink2,
          phone: this.phone,
          website: this.website
        })
        .subscribe(
          result => {
            this.registrationSuccessful();
          },
          error => {
            console.log(error);
          }
        );
  
  }
  registrationSuccessful(){
    
      let alert = this.alertCtrl.create({
        title: 'Charity Registration Successful',
        subTitle: 'Check out the charity now on the explore page',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.pop();
    

  }

}
