import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';
import { ProfilePage } from '../profile/profile';
import { PaymentPage } from '../payment/payment';
import { PortfolioPage } from '../portfolio/portfolio';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  template: `
  <ion-tabs>
    <ion-tab tabIcon="compass" tabTitle="Explore" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="card" tabTitle="Payment" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="pie" tabTitle="Portfolio" [root]="tab3"></ion-tab>
    <ion-tab tabIcon="person" tabTitle="Profile" [root]="tab4"></ion-tab>
  </ion-tabs>`
})

export class TabsPage {
  exploreRoot = ExplorePage;
  paymentRoot = PaymentPage;
  portfolioRoot = PortfolioPage;
  profileRoot = ProfilePage;
  jwt={
    name: "test"
  };
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      
  }

}