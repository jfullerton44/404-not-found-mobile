import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Charity } from '../../models/charity';
import { Http } from '@angular/http';
import { CharityPage } from '../charity/charity';


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

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
        this.getCharities();
    }

    getCharities() {
        this.http.get("http://localhost:3000/charities").subscribe(
            result => {
                this.sortedCharities = result.json().sort(this.compare);
                let index = 0;
                while(index < this.sortedCharities.length){
                    this.http.get("http://localhost:3000/charities/" + this.sortedCharities[index].id + "/projects").subscribe(
                        result => {
                            console.log(result.json());
                            this.numProjects.push(result.json().length);
                        },
                        error => {
                            console.log(error);
                        }
                    );
                    this.http.get("http://localhost:3000/donations",
                {
                    params: {
                        charity_id: this.sortedCharities[index].id
                    }
                }).subscribe(
                    result => {
                        var len = result.json().length;
                        console.log(len);
                        console.log(this.numDonations);
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

    compare(a,b){
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }

    navigateToProjects(charity){
        this.navCtrl.push(CharityPage, {
            charity: charity
        })
    }
}
