import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';


/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-portfolio',
    templateUrl: 'portfolio.html',
})
export class PortfolioPage {
    @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any;
    user: User;
    jwt: string;
    username: string;
    donationAmount: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    charities: Array<string> = ["", "", "", "", "", "", "", "", ""];
    charitiesFinal: Array<string>=[];
    donationAmountFinal:Array<number>=[];
    totalDonations: number;
    numberOfDonations: number;
    public donations: any =[];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        public http: Http,
        public configService: ConfigService
    ) {

        storage.get('jwt').then((val) => {
            this.jwt = val;
            this.http
                .get(this.configService.getBaseUrl() + "/users", {
                    params: {
                        jwt: this.jwt
                    }
                })
                .subscribe(
                    result => {
                        let tUser = result.json().user;
                        this.user = tUser;
                        this.username = tUser.username
                        this.http
                            .get(this.configService.getBaseUrl() + "/donationsId", {
                                params: {
                                    user_id: tUser.id
                                }
                            })
                            .subscribe(
                                result => {
                                    this.donations = result.json();
                                    console.log(this.donations)
                                    let i = 0;

                                    

                                    let len = this.donations.length;

                                    let tval = 0;
                                    while (i < len) {
                                        tval = this.donations[i].amount_donated;
                                        this.donationAmount[this.donations[i].charity_id] += tval;
                                        i++
                                    }
                                    this.http
                                        .get(this.configService.getBaseUrl() + "/charities")
                                        .subscribe(
                                            result => {
                                                let i = 0;
                                                let charityList = result.json();
                                                while (i < charityList.length) {
                                                    this.charities[charityList[i].id] = charityList[i].name;
                                                    i++;
                                                }
                                                this.makeDonut()
                                            },
                                            error => {
                                                console.log(error);
                                            }
                                        );
                                },
                                error => {
                                    console.log(error);
                                }

                            );
                    },
                    error => {
                        console.log(error);
                    }

                );
        });

    }


    makeDonut() {

        let i=0;
        let len= this.charitiesFinal.length;
        this.totalDonations=0;
        while(i<len){
            this.charitiesFinal.pop();
            this.donationAmountFinal.pop();
            i++;
        }
        while(i<this.charities.length){
            if(this.donationAmount[i]!=0){
                this.totalDonations= this.donationAmount[i]+ this.totalDonations;
                this.donationAmountFinal.push(this.donationAmount[i]);
                this.charitiesFinal.push(this.charities[i]);
            }
            i++;
        }
        this.numberOfDonations= this.donations.length;

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: this.charitiesFinal,
                datasets: [{
                    label: 'Percent of donation',
                    data: this.donationAmountFinal,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }

        });
    }

    reload(){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
}
