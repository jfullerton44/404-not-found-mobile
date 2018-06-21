import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charity';
import { CharityPage } from '../charity/charity';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';

/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  username: string;
  jwt: string;

  public charities: Array<Charity>=[];
  private currentColor: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public configService: ConfigService
    ){

    this.http
    .get(this.configService.getBaseUrl() + "/charities")
    .subscribe(
      result => {
        let i=0;
        while(i<result.json().length){
          this.charities.push(result.json()[i]);
          i++;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
  }

  navigateToProfile(){
    this.navCtrl.push(ProfilePage,{username: this.username});
  }

  navigateToPage(charity:Charity){
    this.navCtrl.push(CharityPage,{charity : charity});
  }

}

