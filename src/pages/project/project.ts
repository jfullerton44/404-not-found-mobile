import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';


/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  public project;
  public charity;
  public posts = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http, public configService: ConfigService) {
    this.project = this.navParams.get('project');
    this.charity = this.navParams.get('charity');
    this.getPosts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  getPosts(){
    this.http.get(this.configService.getBaseUrl() + "/charities/${this.charity.id}/projects/${this.project.id}/posts")
    .subscribe(
      result => {
        this.posts = result.json();
      },
      error => {
        console.log(error);
      }
    )
  }
}
