import { UserFormValidationInterface } from '../data-access/types/user-create-edit.interface'

export const userFormValidationMessages: UserFormValidationInterface = {
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

export const titleLabel = {
  create: 'Create user',
  edit: 'Edit user',
}

export const buttonLabel = {
  create: 'Create',
  edit: 'Edit',
}
