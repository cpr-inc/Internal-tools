import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MobileService {

  MobileSubject = new Subject<boolean>();
  public Mobile$ = this.MobileSubject.asObservable();

  constructor() { }

  SetMobileState(state: boolean){
    console.log('service catch:',state)
    this.MobileSubject.next(state);
    console.log(this.Mobile$.subscribe())
  }

}
