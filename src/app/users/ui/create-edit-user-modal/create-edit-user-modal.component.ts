import { ChangeDetectionStrategy, Component, computed, Inject, OnInit, Signal } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { buttonLabel, titleLabel, userFormValidationMessages } from '../../utils/consts'
import { UserFormValidationInterface } from '../../data-access/types/user-create-edit.interface'
import { UserInterface } from '../../data-access/types/user.interface'

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user-modal.component.html',
  styleUrl: './create-edit-user-modal.component.scss',
})
export class CreateEditUserModalComponent {
  userFormValidation: UserFormValidationInterface = userFormValidationMessages

  userForm: FormGroup = this.fb.nonNullable.group({
    id: [Date.now()],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    website: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?$'),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: UserInterface },
  ) {
    this.data.user && this.userForm.patchValue(this.data.user)
  }

  isEdit: Signal<boolean> = computed(() => Boolean(this.data.user))

  titleText: Signal<string> = computed(() => (this.isEdit() ? titleLabel.edit : titleLabel.create))

  buttonText: Signal<string> = computed(() =>
    this.isEdit() ? buttonLabel.edit : buttonLabel.create,
  )

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue())
    }
  }
}
