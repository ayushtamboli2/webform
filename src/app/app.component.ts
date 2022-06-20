import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onlineEvent: Observable<Event> | undefined;
  offlineEvent: Observable<Event> | undefined;
  
  title = 'webForm';
}







































































































































// Developed By- Ayush Tamboli, Project Tranee, NIC(Mungeli), Mobile- 9039272267, Email- ayushtamboli2@gmail.com