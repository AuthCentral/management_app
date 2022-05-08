import {Component, isDevMode, OnInit} from '@angular/core';
import {AuthenticationService} from "../../utils/services/authentication.service";
import {Account} from "../../utils/models/account";
import {UserRoles} from "../../utils/models/constants/user-roles";
import {LoginService} from "../../utils/services/login.service";

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  userAccount: Account | null = null;

  constructor(
    private accountService: AuthenticationService,
    private loginService: LoginService,
  ) {
    if (isDevMode()) {
      this.userAccount = new Account(
        true,
        [UserRoles.ROLE_ADMIN.toString()],
        "mayank.soni@protonmail.com",
        "Mayank",
        "Soni",
        "mayank.soni",
        ""
      )
    }
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe({
      next: accountDetails => this.userAccount = accountDetails,
      error: err => console.error(err)
    });

  }

  login() {
    this.loginService.login();
  }

}
