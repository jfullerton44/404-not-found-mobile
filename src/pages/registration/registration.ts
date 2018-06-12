import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';

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
    public http: Http
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
      this.register();
    }
  }

  register(){
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
          console.log(result);

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
