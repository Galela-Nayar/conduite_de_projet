import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id: string = '';
  constructor() {}

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }
}
