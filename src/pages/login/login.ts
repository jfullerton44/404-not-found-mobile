import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../../config.service';


@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  public username: string;
  public password: string;
  public jwt: string;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private alertCtrl : AlertController,
    public configService: ConfigService
) {
}
  navigateToProfile(){
    this.navCtrl.setRoot(TabsPage,{username: this.username})
  }
  login(storage: Storage) {
    this.http
      .post(this.configService.getBaseUrl() + "/login", {
        username: this.username,
        password: this.password
      })
      .subscribe(
        result => {
          let token = result.json().token;
          storage.set('jwt', token);
          storage.set('jwtFull', result);
          // Our username and password (on this) should have data from the user
          this.navCtrl.setRoot(TabsPage);

        },
        error => {
          this.LoginUnsuccessful();
          console.log(error);
        }
      );
  }
  LoginUnsuccessful() {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Username or Password incorrect',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}


