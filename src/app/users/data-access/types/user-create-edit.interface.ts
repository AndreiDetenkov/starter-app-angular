export interface UserFormValidationInterface {
  name: ValidationMessagesInterface[]
  website: ValidationMessagesInterface[]
  phone: ValidationMessagesInterface[]
  email: ValidationMessagesInterface[]
}

interface ValidationMessagesInterface {
  type: string
  message: string
}
