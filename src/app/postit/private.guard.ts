import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard
  implements CanActivate, CanDeactivate<CanComponentDeactivate>
{
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const bool = Math.random() < 0.5;

    if (!bool) alert('Accesso negato :(');

    return bool;
  }

  canDeactivate(component: CanComponentDeactivate) {
    //faccio definire la funzione al component
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
