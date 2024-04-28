import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoEditarService {

  constructor() { }

  private eventSubject = new Subject<any>();

  emitEvent(eventoEditar: any) {
    this.eventSubject.next(eventoEditar);
  }

  getEvent() {
    return this.eventSubject.asObservable();
  }
}
