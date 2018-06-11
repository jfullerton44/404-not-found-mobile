import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username: string;
  jwt:string;

  constructor(public navCtrl: NavController , public navParams: NavParams,private app:App) {
    this.jwt = this.navParams.get('jwt');
    console.log('passed params',navParams.data);
  }

  navigateToHome(){
    this.app.getRootNav().setRoot(HomePage);

  }
  navigateToExplore(){
    this.navCtrl.push(ExplorePage);
  }

  showData(){
    alert(this.username);
  }

}
