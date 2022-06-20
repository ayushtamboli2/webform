import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SendmsgService {

  constructor() { }

  messageEmitter= new EventEmitter<Object>();
}
