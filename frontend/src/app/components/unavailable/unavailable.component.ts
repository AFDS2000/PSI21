import { Component, OnInit } from '@angular/core';

import { UnavailableService } from 'src/app/services/unavailable.service';
import { Unavailable } from 'src/app/models/unavailable';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.scss'],
})

export class UnavailableComponent implements OnInit {
  
  un: Unavailable | undefined;


  constructor(private unService: UnavailableService) {    
  }

  ngOnInit(): void {
  }

  addUna(): void {
    if(this.un)
      this.unService.addUnavailable(this.un).subscribe((msg) => {
        if (msg) {
            Swal.fire({
                icon: 'success',
                title: 'Periodo adicionado',
                showConfirmButton: false,
                timer: 1500
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao adicionar o Periodo',
          });
        }
    })
  }
}