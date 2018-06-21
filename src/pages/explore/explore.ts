import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charity';
import { CharityPage } from '../charity/charity';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';

/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  username: string;
  jwt: string;

  public charities: Array<Charity>=[];
  private currentColor: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public configService: ConfigService
    ){
<<<<<<< HEAD
=======
    this.currentColor = 'orange'
    // var charity1 = new Charity();
    // charity1.id = 1;
    // charity1.name = "Tennis for Fun";
    // charity1.description = "Special Olympics training for special needs atheletes.";
    // charity1.photoLink= "http://tennisforfun.org/wp-content/uploads/2018/03/DSC_0506-X4-e1522172511421-918x1024.jpg";
    // charity1.photoLink2= "http://tennisforfun.org/wp-content/uploads/2018/03/cropped-tff_jesuit-2.jpg"
    // charity1.website = "http://tennisforfun.org/"
    // charity1.descriptionFull= "  Tennis For Fun, a free tennis clinic for athletes with special needs, is a volunteer organization that provides athletes with an opportunity to have fun playing tennis, to learn basic skills and to socialize with each other. Our program specializes with athletes of all ages that are intellectually handicapped, especially those with Down Syndrome, but other special needs athletes who qualify for Special Olympics are also welcome to join the program. Tennis For Fun is entirely a volunteer organization.  All services and equipment are donated by our wonderful and dedicated volunteers."

    // var charity2 = new Charity();
    // charity2.id= 2;
    // charity2.name ='The Water Project';
    // charity2.description= 'You can help end the water crisis and restore hope. Together we will provide access to clean, safe and reliable water across sub-Saharan Africa - one community at a time.';
    // charity2.photoLink='https://thewaterproject.org/images/The_Water_Project_Logo.png'
    // charity2.photoLink2='http://thewaterproject.org/community/wp-content/uploads/2011/11/water-project.jpg';
    // charity2.website= 'https://thewaterproject.org/';
    // charity2.descriptionFull = 'The Water Project, Inc. is a 501(c)(3) non-profit organization unlocking human potential by providing reliable water projects to communities in sub-Saharan Africa who suffer needlessly from a lack of access to clean water and proper sanitation. For ten years, we have been helping communities gain access to clean, safe water by providing training, expertise and financial support for water project construction through our staff and implementing partners.'
    // this.charities.push(charity1);
    // this.charities.push(charity2);
>>>>>>> julia-ui-branch

    this.http
    .get(this.configService.getBaseUrl() + "/charities")
    .subscribe(
      result => {
        let i=0;
        while(i<result.json().length){
          this.charities.push(result.json()[i]);
          i++;
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  ionViewDidLoad() {
  }

  navigateToProfile(){
    this.navCtrl.push(ProfilePage,{username: this.username});
  }

  navigateToPage(charity:Charity){
    this.navCtrl.push(CharityPage,{charity : charity});
  }

}

