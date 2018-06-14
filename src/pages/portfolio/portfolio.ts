import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { Http } from '@angular/http';

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
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        public http: Http
    ) {

        storage.get('jwt').then((val) => {
            this.jwt = val;
            this.http
                .get("http://localhost:3000/users", {
                    params: {
                        jwt: this.jwt
                    }
                })
                .subscribe(
                    result => {
                        let tUser = result.json().user;
                        this.user = tUser;
                        this.username = tUser.username
                        //console.log("run");
                        this.http
                            .get("http://localhost:3000/donationsId", {
                                params: {
                                    user_id: tUser.id
                                }
                            })
                            .subscribe(
                                result => {
                                    var donations = result.json();
                                    //console.log(donations);
                                    let i = 0;
                                    let len = donations.length;
                                    let tval = 0;
                                    while (i < len) {
                                        tval = donations[i].amount_donated;
                                        this.donationAmount[donations[i].charity_id] += tval;
                                        i++
                                    }
                                    this.http
                                        .get("http://localhost:3000/charities")
                                        .subscribe(
                                            result => {
                                                let i = 0;
                                                let charityList = result.json();
                                                while (i < charityList.length) {
                                                    this.charities[charityList[i].id] = charityList[i].name;
                                                    i++;
                                                }
                                                this.makeDonut()
                                                //console.log(this.charities);
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


    //ionViewDidLoad() {
    makeDonut() {
        let i=0;
        while(i<this.charities.length){
            if(this.donationAmount[i]!=0){
                console.log('nonzero');
                this.donationAmountFinal.push(this.donationAmount[i]);
                this.charitiesFinal.push(this.charities[i]);
            }
            i++;
        }
        console.log(this.donationAmount);
        console.log(this.charities);
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
}
