import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '../../components/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  username: string | null = null;

  constructor(
    private userService : UserService,
  ) {}

   getUsername(): void {
    this.userService.username$.subscribe((name) => {
      this.username = name;
    });
  }
}
