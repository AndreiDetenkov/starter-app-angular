import { Observable, take } from 'rxjs'
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AsyncPipe } from '@angular/common'
import { Store } from '@ngrx/store'

import { usersActions } from '../../data-access/store/users.actions'
import { usersFeature } from '../../data-access/store/users.reducer'
import { UserInterface } from '../../data-access/types/user.interface'
import { UserCardComponent } from '../../ui/user-card/user-card.component'
import { CreateEditUserModalComponent } from '../../ui/create-edit-user-modal/create-edit-user-modal.component'
import { ContainerComponent } from '../../../shared/ui/container/container.component'
import { StorageService } from '../../../shared/services/storage.service'

@Component({
  selector: 'app-users-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, UserCardComponent, ContainerComponent, AsyncPipe],
  providers: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private store = inject(Store)
  private dialog = inject(MatDialog)
  private storageService = inject(StorageService)

  users$: Observable<UserInterface[]> = this.store.select(usersFeature.selectUsers)

  ngOnInit(): void {
    const users = this.storageService.get('users')

    const dispatchAction = users
      ? usersActions.setUsers({ users: users as UserInterface[] })
      : usersActions.getUsers()
    this.store.dispatch(dispatchAction)
  }

  removeUserHandler(id: number): void {
    this.store.dispatch(usersActions.removeUser({ id }))
  }

  openDialog(user?: UserInterface): void {
    const isEdit = computed<boolean>(() => Boolean(user))

    const dialogRef: MatDialogRef<CreateEditUserModalComponent> = this.dialog.open(
      CreateEditUserModalComponent,
      { maxWidth: '380px', width: '100%', data: { user } },
    )

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((user): void => {
        if (!user) return

        const dispatchAction = isEdit()
          ? usersActions.updateUser({ user })
          : usersActions.createUser({ user })
        this.store.dispatch(dispatchAction)
      })
  }
}
