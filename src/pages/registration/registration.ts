import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  username: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  jwt: string;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage

  ) {
  }

  navigateToTabs(){
    this.navCtrl.setRoot(TabsPage,{username:this.username} )
  }

  checkPassword(){
    if(this.password!=this.password2){
      alert('Passwords do not match');
    }
    else{
      this.register(this.storage);
    }
  }

  register(storage: Storage){
    this.http
      .post("http://localhost:3000/reg/users", {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        dob: this.dob

      })
      .subscribe(
        result => {
          let token = result.json().token;
          storage.set('jwt', token);

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
