import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  username: string;
  password: string;
  password2: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToTabs(){
    this.navCtrl.setRoot(TabsPage,{username:this.username} )
  }

  checkPassword(){
    if(this.password!=this.password2){
      alert('Passwords do not match');
    }
    else{
      this.navigateToTabs();
    }
  }
}
