import { Component } from '@angular/core'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
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
  userForm = this.fb.nonNullable.group({
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
    phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    email: ['', [Validators.required, Validators.email]],
  })

  userFormValidationMessages = {
    name: [
      { type: 'required', message: `Name is required` },
      { type: 'minlength', message: `Name must be at least 3 characters long` },
      { type: 'maxlength', message: `Name cannot be more than 25 characters long` },
    ],
    website: [
      { type: 'required', message: `Website is required` },
      { type: 'minlength', message: `Website must be at least 5 characters long` },
      { type: 'pattern', message: `Invalid website` },
    ],
    phone: [
      { type: 'required', message: `Phone is required` },
      { type: 'pattern', message: `Invalid phone number` },
    ],
    email: [
      { type: 'required', message: `Email is required` },
      { type: 'pattern', message: `Enter a valid email address` },
    ],
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEditUserModalComponent>,
  ) {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue())
    }
  }
}
