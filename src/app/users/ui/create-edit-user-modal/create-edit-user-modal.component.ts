import { Component } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
	selector: 'app-create-edit-user',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
	templateUrl: './create-edit-user-modal.component.html',
	styleUrl: './create-edit-user-modal.component.scss',
})
export class CreateEditUserModalComponent {}
