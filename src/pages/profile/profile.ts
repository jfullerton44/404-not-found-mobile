import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { User } from '../../models/user';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  username: string;
  jwt: string;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, public http: Http, private storage: Storage) {
    storage.get('jwt').then((val) => {
      this.jwt = val;
      //console.log('final val', this.jwt);
      this.http
        .get("http://localhost:3000/users", {
          params: {
            jwt: this.jwt
          }
        })
        .subscribe(
          result => {
            let tUser = result.json().user;
          },
          error => {
            console.log(error);
          }
        );
    });

  }

  navigateToHome(storage:Storage) {
    storage.remove('jwt');
    this.app.getRootNav().setRoot(HomePage);

  }
  navigateToExplore() {
    this.navCtrl.push(ExplorePage);
  }

  showData() {
    alert(this.username);
  }

}
