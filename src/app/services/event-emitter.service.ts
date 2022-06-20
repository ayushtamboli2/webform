import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription'; 

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokePendingComponentFunction = new EventEmitter();    
  subsVar!: Subscription;    
    
  constructor() { }    
    
  onSendClick() {    
    this.invokePendingComponentFunction.emit();    
  }   
}
