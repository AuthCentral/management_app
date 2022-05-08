import { Injectable } from '@angular/core';
import {filter, Observable, Observer, share, Subscription} from "rxjs";
import {type} from "os";
export class EventWithContent<T>{
  constructor(
    public name:string,
    public content:T
  ) {
  }
}
@Injectable({
  providedIn: 'root'
})
export class EventService {
  observable:Observable<EventWithContent<unknown> | string>;
  observer?:Observer<EventWithContent<unknown> | string>;

  constructor() {
    this.observable = new Observable((observer:Observer<EventWithContent<unknown>|string>) =>{
      this.observer = observer;
    }).pipe(share());
  }
  broadcast(event:EventWithContent<unknown> | string){
    if(this.observer){
      this.observer.next(event)
    }
  }
  destroy(subscriber:Subscription){
    subscriber.unsubscribe();
  }

  /**
   * Subscribe to event with callback
   * @param eventNames Single Event name or event names to subscribe
   * @param callback Callback to execute when event occurs
   */
  subscribe(eventNames:string| string[], callback:(event:EventWithContent<unknown> | string) => void):Subscription{
    if(typeof eventNames ==='string'){
      eventNames = [eventNames];

    }
    return this.observable.pipe(
      filter((event:EventWithContent<unknown> | string) =>{
        for(const eventName of eventNames){
          if((typeof event ==='string' && event === eventName) || (typeof event !=='string' && event.name === eventName)){
            return true;
          }
        }
        return false;
      })
    ).subscribe(callback)
  }

}
