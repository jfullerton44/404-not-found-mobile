import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { CardPage } from '../card/card';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  createNewPayment(){
    let modal = this.modalCtrl.create(PaymentPage);
    modal.present();
  }

  viewPayments(){
    this.navCtrl.push(CardPage);
  }
}
