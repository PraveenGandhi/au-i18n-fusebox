import { autoinject } from 'aurelia-framework';
import { AppState } from '../../services/app-state';

@autoinject()
export class Dashboard {
    cards = [{
        icon: 'database',
        color: 'blue',
        header: 'test',
        headerCount: '105件',
        secIcon: 'calendar',
        date: '本日【2019年10月5日】'
    }, {
        icon: 'edit',
        color: 'yellow',
        header: 'plan',
        headerCount: '1,345台',
        secIcon: 'calendar',
        date: '本日【2019年10月5日】'
    }, {
        icon: 'box',
        color: 'orange',
        header: 'data',
        secIcon: 'clock outline',
        headerCount: '23件',
        date: ''
    }];

    constructor(private appState: AppState) {}

    activate() {
        this.appState.loadingMessage = '';
        this.appState.viewName = 'ダッシュボード';
    }

}