import { ChangeDetectionStrategy, Component, computed, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'

import { UsersService } from '../../data-access/users.service'
import { GetUsersUseCase } from '../../data-access/get-users.usecase'
import { NotifyUseCase } from '../../../shared/services/notify/notify.usecase'
import { UserInterface } from '../../data-access/types/user.interface'

import { UserCardComponent } from '../../ui/user-card/user-card.component'
import { CreateEditUserModalComponent } from '../../ui/create-edit-user-modal/create-edit-user-modal.component'
import { ContainerComponent } from '../../../shared/ui/container/container.component'
import { StorageUseCase } from '../../../shared/services/storage/storage.usecase'
import { Store } from '@ngrx/store'
import { usersActions } from '../../data-access/store/users.actions'
import { usersFeature } from '../../data-access/store/users.reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-users-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, UserCardComponent, ContainerComponent],
  providers: [UsersService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  // store = inject(Store)

  users$: Observable<UserInterface[]> = this.store.select(usersFeature.selectUsers)

  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private notifyService: NotifyUseCase,
    private storageService: StorageUseCase,
    private usersService: UsersService,
    private store: Store,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    // const users = this.storageService.get('users')
    this.store.dispatch(usersActions.getUsers())
  }

  // fetchUsersAndStore(): void {
  //   this.getUsersUseCase
  //     .execute()
  //     .pipe(take(1))
  //     .subscribe((users: UserInterface[]) => {
  //       this.usersService.setUsers(users)
  //       this.storageService.set('users', users)
  //     })
  // }

  // notifyAndStorage(msg: string): void {
  //   this.users.pipe(take(1)).subscribe((users) => {
  //     this.notifyService.success(msg)
  //     this.storageService.set('users', users)
  //   })
  // }
  //
  removeUserHandler(id: number): void {
    console.log(id)
    // this.usersService.removeUserById(id)
    // this.notifyAndStorage('Updated successfully!')
  }
  //
  // addUserHandler(userData: UserInterface): void {
  //   this.usersService.addUser(userData)
  //   this.notifyAndStorage('Added successfully!')
  // }
  //
  // updateUserHandler(userData: UserInterface): void {
  //   this.usersService.updateUser(userData)
  //   this.notifyAndStorage('Updated successfully!')
  // }

  openDialog(user?: UserInterface): void {
    const isEdit = computed<boolean>(() => Boolean(user))

    const dialogRef: MatDialogRef<CreateEditUserModalComponent> = this.dialog.open(
      CreateEditUserModalComponent,
      { maxWidth: '380px', width: '100%', data: { user } },
    )

    dialogRef.afterClosed().subscribe((userData): void => {
      if (!userData) return

      // isEdit() ? this.updateUserHandler(userData) : this.addUserHandler(userData)
    })
  }
}
