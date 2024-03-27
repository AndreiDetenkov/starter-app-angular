import { Injectable } from '@angular/core'

import { UserResponse } from '../models/user-response'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root',
})
export class UserAdapter {
  adapt(user: UserResponse): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
    }
  }
}
