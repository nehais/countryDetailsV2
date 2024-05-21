import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from 'src/app/models/country';
import { Subject, Subscription, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit, OnDestroy{
  countries: Country[] = [];
  countryDetails : Country[] =[];
  countrySelect : string | undefined;
  displayedColumns: string[] = ['name', 'code', 'unMember','population', 'languages', 'flags'];
  selectError : boolean = false;
  unsubscribe$ = new Subject<void>();

  constructor (private countryService: CountryService){}

  ngOnInit(): void {
    this.countryService.getAllCountries().pipe(takeUntil(this.unsubscribe$)).subscribe(data =>{
      this.countries = data;
    });
  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCountryDetails(){
    if (this.countrySelect){
      this.countryService.getCountryDetailsWithCode(this.countrySelect).pipe(takeUntil(this.unsubscribe$)).subscribe(data =>{
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
