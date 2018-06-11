import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  public username: string;
  public password: string;
  public jwt: string

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
) {

  }
  navigateToProfile(){
    this.navCtrl.setRoot(TabsPage,{username: this.username})
  }
  login() {
    this.http
      .post("http://localhost:3000/login", {
        username: this.username,
        password: this.password
      })
      .subscribe(
        result => {
          console.log('result', result);
          // Our username and password (on this) should have data from the user
          this.navCtrl.setRoot(TabsPage, {
            jwt: result
          });
        },
        error => {
          console.log(error);
        }
      );
  }
}


