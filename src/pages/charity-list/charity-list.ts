import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
import { CharityPage } from '../charity/charity';
import { ConfigService } from '../../config.service';


@IonicPage()
@Component({
    selector: 'page-charity-list',
    templateUrl: 'charity-list.html',
})
export class CharityListPage {
    public sortedCharities: any[];
    public numProjects: any[];
    public numDonations: any[];
    public indexArr: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: Http,
        public configService: ConfigService
    ) {
        this.numProjects = [];
        this.numDonations = [];
        this.indexArr = [];
        this.getCharities();
    }

    getCharities() {
        this.http
            .get(this.configService.getBaseUrl() + "/charities")
            .subscribe(
                result => {
                    this.sortedCharities = result.json().sort(this.compare);
                    let index = 0;
                    while (index < this.sortedCharities.length) {
                        let currid =this.sortedCharities[index].id;
                        this.http.get(this.configService.getBaseUrl() + `/charities/${currid}/projects`)
                            .subscribe(
                                result => {
                                    this.numProjects.push(result.json().length);
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        this.http.get(this.configService.getBaseUrl() + `/charities/${currid}/donations`)
                            .subscribe(
                                result => {
                                    this.numDonations.push(result.json().length);
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        this.indexArr.push(index);
                        index++;
                    }
                },
                error => {
                    console.log(error);
                }
            )
    }

    compare(a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }

    navigateToProjects(charity) {
        this.navCtrl.push(CharityPage, {
            charity: charity
        })
    }
}
