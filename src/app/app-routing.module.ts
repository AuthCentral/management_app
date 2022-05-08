import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RealmConfigurationComponent} from "./pages/realm-configuration/realm-configuration.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'configuration',component: RealmConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
