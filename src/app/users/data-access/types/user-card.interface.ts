import { UserInterface } from './user.interface'

export interface UserCardInterface
	extends Pick<UserInterface, 'name' | 'website' | 'phone' | 'email' | 'id'> {
	id: number
	name: string
	website: string
	phone: string
	email: string
}
