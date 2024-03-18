import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { take } from 'rxjs'

import { UsersService } from '../../data-access/users.service'
import { GetUsersUseCase } from '../../data-access/get-users.usecase'
import { GetUsersService } from '../../data-access/get-users.service'
import { UserInterface } from '../../data-access/types/user.interface'

import { UserCardComponent } from '../../ui/user-card/user-card.component'
import { CreateEditUserModalComponent } from '../../ui/create-edit-user-modal/create-edit-user-modal.component'
import { ContainerComponent } from '../../../shared/ui/container/container.component'

@Component({
  selector: 'app-users-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, UserCardComponent, ContainerComponent],
  providers: [
    {
      provide: GetUsersUseCase,
      useClass: GetUsersService,
    },
    UsersService,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users = this.usersService.users$

  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUsersUseCase
      .execute()
      .pipe(take(1))
      .subscribe((users: UserInterface[]) => (this.usersService.setUsers = users))
  }

  removeUser(id: number): void {
    this.usersService.removeUserById(id)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserModalComponent, {
      maxWidth: '380px',
      width: '100%',
    })

    dialogRef.afterClosed().subscribe((userData) => {
      this.usersService.addUser(userData)
    })
  }
}
