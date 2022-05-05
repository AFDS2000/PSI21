import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if(this.authService.isUserLoogedIn$.value) {
            this.router.navigate(["home/myTasks"]);
        }

        return !this.authService.isUserLoogedIn$.value;
    }
}