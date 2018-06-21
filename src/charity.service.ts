import { Injectable } from '@angular/core';
import { Charity } from '../../404-not-found-mobile/src/models/charity';
import { Observable } from 'rxjs/Observable';
// import { ArrayObservable } from 'rxjs/observable/ArrayObservable'
import { Storage } from '@ionic/storage';
import { Http } from "@angular/http";
import { ConfigService } from '../src/config.service';
import 'rxjs/add/observable/of';

@Injectable()
export class CharityServiceProvider {

  private charities: Array<Charity> = []; 

  constructor(
      public http:Http,
      public configService: ConfigService  
  ) {
    this.http
    .get(this.configService.getBaseUrl() + "/charities")
    .subscribe(
      result => {
        let i = 0;
        while (i < result.json().length) {
          this.charities.push(result.json()[i]);
          i++;
        }   
      },
      error => {
        console.log(error);
      }
    ); 
  }

  filterCharities(searchText){
    return this.charities.filter((charity) => {
        return charity.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });    

}
}
