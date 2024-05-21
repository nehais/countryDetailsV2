import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country/country-list/country-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/country', pathMatch:  'full'},
  {path: 'country', component: CountryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
