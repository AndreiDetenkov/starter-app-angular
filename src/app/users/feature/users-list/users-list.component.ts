import { filter } from 'rxjs'
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AsyncPipe } from '@angular/common'
import { Store } from '@ngrx/store'

import { usersActions } from '../../data-access/store/users.actions'
import { usersFeature } from '../../data-access/store/users.reducer'
import { User } from '../../data-access/models/user'
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
  readonly store = inject(Store)
  readonly dialog = inject(MatDialog)
  readonly storageService = inject(StorageService)

  users$ = this.store.select(usersFeature.selectUsers)

  ngOnInit(): void {
    const users = this.storageService.get('users')

    this.store.dispatch(
      users ? usersActions.setUsers({ users: users as User[] }) : usersActions.getUsers(),
    )
  }

  removeUserHandler(id: number): void {
    this.store.dispatch(usersActions.removeUser({ id }))
  }

  openDialog(user?: User): void {
    const isEdit = computed<boolean>(() => Boolean(user))

    const dialogRef: MatDialogRef<CreateEditUserModalComponent> = this.dialog.open(
      CreateEditUserModalComponent,
      { maxWidth: '380px', width: '100%', data: { user } },
    )

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .pipe(filter((user) => Boolean(user)))
      .subscribe((user) =>
        this.store.dispatch(
          isEdit() ? usersActions.updateUser({ user }) : usersActions.createUser({ user }),
        ),
      )
  }
}
