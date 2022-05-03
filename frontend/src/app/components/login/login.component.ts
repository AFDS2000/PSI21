import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.loginForm = this.createFormGroup();
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required])
        });
    }

    login(): void {
        this.authService.
            login(this.loginForm.value.name, this.loginForm.value.password)
            .subscribe();
    }
}
