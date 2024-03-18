import { Component } from '@angular/core'

@Component({
	selector: 'app-container',
	standalone: true,
	imports: [],
	template: `
		<div class="container">
			<ng-content></ng-content>
		</div>
	`,
	styles: `
		.container {
			margin: 0 auto;
			max-width: 1200px;
			width: 100%;
			padding: 20px;
		}
	`,
})
export class ContainerComponent {}
