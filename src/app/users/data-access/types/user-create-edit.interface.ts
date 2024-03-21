export interface UserFormValidationInterface {
  name: ValidationMessageInterface[]
  website: ValidationMessageInterface[]
  phone: ValidationMessageInterface[]
  email: ValidationMessageInterface[]
}

interface ValidationMessageInterface {
  type: string
  message: string
}
