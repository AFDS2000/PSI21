import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent {
    isAuthenticated = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.isUserLoogedIn$.subscribe((isLoggedIn) => {
            this.isAuthenticated = isLoggedIn
        })
    }
}
