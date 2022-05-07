import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

    team: Team | undefined;
    user: User | undefined;
    displayedColumns: string[] = ['name'];
    users$!: Observable<User[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private teamService: TeamService,
        private userService: UserService,
        private route: ActivatedRoute) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.getTeam();
        this.users$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.userService.searchUsers(term))
        );
    }

    getTeam(): void {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.teamService.getTeam(id).subscribe((team) => (this.team = team));
    }

    setUser(user: User): void {
        this.user = user;
    }

    addUser(): void {
        if (this.team && this.user)
            this.teamService.addUser(this.team, this.user).subscribe((msg) => {
                if (msg) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Utilizador adiciona à equipa',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getTeam();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Erro ao adicionar utilizador à equipa',
                    });
                }
            });

    }

    deleteUser(user: User): void {
        if (this.team) {
            const team = this.team;
            if (team.users.includes(user)) {
                team.users.splice(team.users.indexOf(user), 1);

                this.teamService.deleteUser(this.team).subscribe((msg) => {
                    if (msg) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Utilizador removido da equipa',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getTeam();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Erro ao remover utilizador da equipa',
                        });
                    }
                });
            }
        }
    }
}
