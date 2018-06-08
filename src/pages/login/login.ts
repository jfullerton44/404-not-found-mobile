import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;

  constructor(public navCtrl: NavController) {

  }
  navigateToProfile(){
    this.navCtrl.setRoot(TabsPage,{username: this.username})
  }

}
