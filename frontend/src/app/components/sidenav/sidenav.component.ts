import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { delay, filter } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    isAdmin!: boolean;
    
    constructor(
        private observer: BreakpointObserver, 
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authService.userType == 'Administrador';
    }

    ngAfterViewInit() {
        this.observer
            .observe(['(max-width: 800px)'])
            .pipe(delay(1), untilDestroyed(this))
            .subscribe((res) => {
                if (res.matches) {
                    this.sidenav.mode = 'over';
                    this.sidenav.close();
                } else {
                    this.sidenav.mode = 'side';
                    this.sidenav.open();
                }
            });

        this.router.events
            .pipe(
                untilDestroyed(this),
                filter((e) => e instanceof NavigationEnd)
            )
            .subscribe(() => {
                if (this.sidenav.mode === 'over') {
                    this.sidenav.close();
                }
            });
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');

        this.authService.isUserLoogedIn$.next(false);
        this.router.navigate(['login']);
    }
}
