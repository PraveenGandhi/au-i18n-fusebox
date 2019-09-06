import { FeathersApi } from './feathers-api';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class AppState {

  public loggedInUser= '';
  public loadingMessage="Logging In..!";
  public viewName = '';
  public theme = {primary:'olive'}
  constructor(public rest:FeathersApi) {}

  login(email,password):Promise<any>{
    return this.rest.client.authenticate({
      "strategy":'local',
      "email":email,
      "password":password 
    }).then(()=> {
      this.loggedInUser = email;
      this.rest.client.set('user', email);
    });
  }

  //don't make it async
  authenticateByJWT():Promise<any>{
    return this.rest.client.authenticate().then(() => {
      this.loadingMessage = 'Authenticated and loading user details!';
      return this.rest.client.get('authentication');
    }).then(data => {
      this.loggedInUser = data.user.email;
      this.rest.client.set('user',this.loggedInUser);
    });
  }

  logout():Promise<any>{
    this.loadingMessage = "Logging out..!"
    return this.rest.client.logout();
  }
  
  register(email,password){
    return this.rest.client.service('users').create({email,password});
  }

  isAuthenticated(){
    return !!this.rest.client.get('user');  
  }

  getLoginRoute(){
    return '';
  }
}
