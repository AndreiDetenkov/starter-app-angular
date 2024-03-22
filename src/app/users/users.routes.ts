import { Routes } from '@angular/router'

export const usersRoutes: Routes = [
	{
		path: '',
		title: 'Users List',
		loadComponent: () =>
			import('./feature/users-list/users-list.component').then((m) => m.UsersListComponent),
	},
]
