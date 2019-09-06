import { autoinject } from 'aurelia-framework';
import { AppState } from '../../services/app-state';

@autoinject()
export class Settings {
    

    colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    constructor(private appState: AppState) {}
    
    async activate() {
        this.appState.loadingMessage = '';
        this.appState.viewName = '設定';
    }

}