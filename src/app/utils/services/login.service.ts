import { Injectable } from '@angular/core';
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private location:Location) { }
  login():void{
    location.href = `${location.origin}/${this.location.prepareExternalUrl("/oauth2/authorization/oidc")}`
  }
}
