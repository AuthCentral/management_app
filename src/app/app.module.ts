import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {TopNavigationComponent} from './layouts/top-navigation/top-navigation.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import { RealmConfigurationComponent } from './pages/realm-configuration/realm-configuration.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavigationComponent,
    FooterComponent,
    RealmConfigurationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
