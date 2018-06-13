import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage} from '../registration/registration';
import { ProfilePage } from '../profile/profile';
import { ExplorePage } from '../explore/explore';
import { Storage } from '@ionic/storage'
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.get('jwt').then((val) => {
      console.log('Your jwt is ', val);
      if(val){
        this.navCtrl.push(TabsPage);
      }
    });
  }


  navigateToLogin(){
    this.navCtrl.push(LoginPage);
  }
  navigateToRegistration(){
    this.navCtrl.push(RegistrationPage);
  }
  navigateToProfile(){
    this.navCtrl.push(ProfilePage);
  }
  navigateToExplore(){
    this.navCtrl.push(ExplorePage);
  }
}
