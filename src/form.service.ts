import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormService {
  fields: string[] = [];

  add(field: string) {
    this.fields.push(field);
  }

  clear() {
    this.fields = [];
  }
}