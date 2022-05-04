import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from './custom-validators'

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    @ViewChild('formDirective') formDirective!: NgForm;
    signupForm!: FormGroup;
    typeUsers = ['Utilizador', 'Administrador'];

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.signupForm = this.createFormGroup();
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9\_\- ]*$/)]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(8),
                Validators.required,
                // check whether the entered password has a number
                CustomValidators.patternValidator(/\d/, {
                    hasNumber: true
                }),
                // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, {
                    hasCapitalCase: true
                }),
                // check whether the entered password has a lower case letter
                CustomValidators.patternValidator(/[a-z]/, {
                    hasSmallCase: true
                })
            ]),
            type: new FormControl("", Validators.required)
        });
    }

    signup() {
        this.authService.signup(this.signupForm.value).subscribe((msg) => {
            if (msg) {
                Swal.fire({
                    icon: 'success',
                    title: 'Utilizador registado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.signupForm.reset()
                this.formDirective.resetForm();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Erro ao criar utilizador',
                });
            }
        });
    }
}
