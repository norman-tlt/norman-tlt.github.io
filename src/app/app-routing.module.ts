import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExploreComponent} from "./components/explore/explore.component";

const routes: Routes = [
  {path: '', component: ExploreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
