import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../utils/services/authentication.service";
import {LoginService} from "../../utils/services/login.service";
import {Account} from "../../utils/models/account";
import {StorageServiceService} from "../../utils/services/storage-service.service";
import {WebAppKeys} from "../../utils/models/constants/web-app-keys";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userIdentity: Account | null = null;

  constructor(
    private accountService: AuthenticationService,
    private loginService: LoginService,
    private storageService: StorageServiceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe({
      next: account => this.userIdentity = account
    })

  }

  login(){
    this.loginService.login();

  }
}
