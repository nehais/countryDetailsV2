import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from 'src/app/models/country';
import { Subject, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit, OnDestroy{
  countries: Country[] = [];
  countryDetails : Country[] =[];
  countrySelect : string | undefined;
  displayedColumns: string[] = ['name', 'code', 'unMember','population', 'languages', 'flag'];
  selectError : boolean = false;
  //unsubscribe$ : new Subject<>();

  constructor (private countryService: CountryService){}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data =>{
      this.countries = data;
    });
  }

  ngOnDestroy(): void{
    
  }

  getCountryDetails(){
    if (this.countrySelect){
      this.countryService.getCountryDetailsWithCode(this.countrySelect).subscribe(data =>{
        this.countryDetails = data;
      })
    }
    else{
      this.selectError = true;
    }
  }

  reset(){
    this.countryDetails = [];
    this.selectError = false;
  }

  sortByCode() {
    return this.countries.sort((a, b) => a.name.common > b.name.common ? 1 : a.name.common === b.name.common ? 0 : -1);
  }

  getLanguages(languages : any): string{
    let allLanguages : string = '';
    for (let language in languages){
      if (allLanguages){
        allLanguages += ', ';
      }
      allLanguages += languages[language];
    }
    return allLanguages;
  }
}
