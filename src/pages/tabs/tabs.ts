import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from '../explore/explore';
import { ProfilePage } from '../profile/profile';
import { CharityListPage } from '../charity-list/charity-list';
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
    <ion-tab tabIcon="list" tabTitle="Charity List" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="pie" tabTitle="Portfolio" [root]="tab3"></ion-tab>
    <ion-tab tabIcon="person" tabTitle="Profile" [root]="tab4"></ion-tab>
  </ion-tabs>`
})
export class TabsPage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.tab1 = ExplorePage;
      this.tab2 = CharityListPage;
      this.tab3 = PortfolioPage;
      this.tab4 = ProfilePage;
  }

}