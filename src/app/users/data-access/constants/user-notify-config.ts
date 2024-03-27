import { NotifyConfig } from '../models/notify-config'

export const userNotifyConfig: NotifyConfig = {
  createUser: { msg: 'User created!', action: 'Close' },
  updateUser: { msg: 'User updated!', action: 'Close' },
  removeUser: { msg: 'User removed!', action: 'Close' },
}
