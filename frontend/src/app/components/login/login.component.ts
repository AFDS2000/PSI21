import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('formDirective') formDirective!: NgForm;
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
            .subscribe((msg) => {
                if (!msg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Nome de utilizador ou senha incorretos',
                    });
                    this.loginForm.reset()
                    this.formDirective.resetForm();
                }
            });
    }
}
