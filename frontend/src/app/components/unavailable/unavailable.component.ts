import { Component, OnInit } from '@angular/core';

import { UnavailableService } from 'src/app/services/unavailable.service';
import { Unavailable } from 'src/app/models/unavailable';

import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.scss'],
})

export class UnavailableComponent implements OnInit {
  
  unavailableForm!: FormGroup;
  minDate = new Date();
  

  constructor(private unService: UnavailableService) {    
  }


  ngOnInit(): void {
    this.unavailableForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      dayUn: new FormControl("",[
        Validators.required,
      ]),
      hStart: new FormControl("", 
        Validators.required),
      hEnd: new FormControl("", 
        Validators.required)
      });
  }

  addUna(): void {
      this.unService.addUnavailable(this.unavailableForm.value).subscribe((msg) => {
        if (msg) {
            Swal.fire({
                icon: 'success',
                title: 'Periodo adicionado',
                showConfirmButton: false,
                timer: 1500
            });
            this.unavailableForm.reset()
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao adicionar o Periodo',
          });
            this.unavailableForm.reset()
          
        }
    })
  }
}