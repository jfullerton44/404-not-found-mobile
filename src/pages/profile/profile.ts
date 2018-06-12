import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-home',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username: string;
  jwt:string;

  constructor(public navCtrl: NavController , public navParams: NavParams,private app:App, private storage: Storage) {
    storage.get('jwt').then((val) => {
      console.log('Your jwt is', val);
    });
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
