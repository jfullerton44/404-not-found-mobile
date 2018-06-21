import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
import { CharityPage } from '../charity/charity';
import { ConfigService } from '../../config.service';
import { CharityServiceProvider } from '../../charity.service'
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';



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
    public searching: any = false;
    public isSearchbarOpened = false;
    public searchText: string = '';
    public searchControl: FormControl;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: Http,
        public configService: ConfigService,
        public charityService: CharityServiceProvider
    ) {
        this.searchControl = new FormControl();
        this.numProjects = [];
        this.numDonations = [];
        this.indexArr = [];
        this.http
            .get(this.configService.getBaseUrl() + "/charities")
            .subscribe(
                result => {
                    let i = 0;
                    while (i < result.json().length) {
                        this.sortedCharities.push(result.json()[i]);
                            i++;
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }

    //this.getCharities();


    // getCharities() {
    //     this.http
    //         .get(this.configService.getBaseUrl() + "/charities")
    //         .subscribe(
    //             result => {
    //                 this.sortedCharities = result.json().sort(this.compare);
    //                 let index = 0;
    //                 while (index < this.sortedCharities.length) {
    //                     let currid = this.sortedCharities[index].id;
    //                     this.http.get(this.configService.getBaseUrl() + `/charities/${currid}/projects`)
    //                         .subscribe(
    //                             result => {
    //                                 this.numProjects.push(result.json().length);
    //                             },
    //                             error => {
    //                                 console.log(error);
    //                             }
    //                         );
    //                     this.http.get(this.configService.getBaseUrl() + `/charities/${currid}/donations`)
    //                         .subscribe(
    //                             result => {
    //                                 this.numDonations.push(result.json().length);
    //                             },
    //                             error => {
    //                                 console.log(error);
    //                             }
    //                         );
    //                     this.indexArr.push(index);
    //                     index++;
    //                 }
    //             },
    //             error => {
    //                 console.log(error);
    //             }
    //         )
    // }

    compare(a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }

    navigateToProjects(charity) {
        this.navCtrl.push(CharityPage, {
            charity: charity
        })
    }

    ionViewDidLoad() {
        this.setFilteredCharities();

        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.searching = false;
            this.setFilteredCharities();

        });

        console.log('ionViewDidLoad BrowsePage');
    }

    onSearchInput() {
        this.searching = true;
    }

    setFilteredCharities() {
        this.sortedCharities = this.charityService.filterCharities(this.searchText);
    }

}
