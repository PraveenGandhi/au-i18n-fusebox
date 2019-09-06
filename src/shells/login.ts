import { AppState } from './../services/app-state';
import { Aurelia } from 'aurelia-framework';

export class Login {
    email = '';
    password = '';
    loginFailed='';
    static inject = [AppState, Aurelia]
    
    constructor(private appState: AppState, private aurelia: Aurelia) {}
    attached(){
        this.appState.loadingMessage='';
        this.loginFailed='';
    }
    login() {
        this.appState.loadingMessage="Logging in ..!"
        this.appState.login(this.email,this.password)
            .then(() => {
                this.aurelia.setRoot('shells/app');
                this.appState.loadingMessage=this.email;
                this.email = '';
                this.password = '';
            }).catch((e) => {
                this.loginFailed = e.message;
                this.appState.loadingMessage='';
            });
    }
    register(){
        this.appState.loadingMessage="Registering you ..!"
        this.appState.register(this.email,this.password)
            .then(() => {
                return this.appState.login(this.email,this.password);
            })
            .then(() => {
                this.aurelia.setRoot('shells/app');
            })
            .catch((e) => {
                this.loginFailed = e.message;
                this.appState.loadingMessage='';
            });
    }
}