import { Redirect, Next, RouteConfig } from 'aurelia-router';
import { AppState } from './app-state';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class AuthorizeStep {

  constructor(private appState: AppState) {}

  run(routingContext:RouteConfig, next: Next) {
    if (routingContext.getAllInstructions().some((i) => i.config.auth) && !this.appState.isAuthenticated()) {
      return next.cancel(new Redirect(this.appState.getLoginRoute()));
    }
    return next();
  }
}