import { ChangeDetectionStrategy, Component, computed, OnInit, Signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Observable, take } from 'rxjs'

import { UsersService } from '../../data-access/users.service'
import { GetUsersUseCase } from '../../data-access/get-users.usecase'
import { GetUsersService } from '../../data-access/get-users.service'
import { UserInterface } from '../../data-access/types/user.interface'

import { UserCardComponent } from '../../ui/user-card/user-card.component'
import { CreateEditUserModalComponent } from '../../ui/create-edit-user-modal/create-edit-user-modal.component'
import { ContainerComponent } from '../../../shared/ui/container/container.component'
import { UserCardInterface } from '../../data-access/types/user-card.interface'

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
  users: Observable<UserInterface[]> = this.usersService.users$

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

  openDialog(user?: UserCardInterface): void {
    const isEdit = computed<boolean>(() => Boolean(user))

    const dialogRef: MatDialogRef<CreateEditUserModalComponent> = this.dialog.open(
      CreateEditUserModalComponent,
      { maxWidth: '380px', width: '100%', data: { user } },
    )

    dialogRef.afterClosed().subscribe((userData): void => {
      isEdit() ? this.usersService.updateUser(userData) : this.usersService.addUser(userData)
    })
  }
}
