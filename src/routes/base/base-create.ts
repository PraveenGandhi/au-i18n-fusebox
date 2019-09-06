import { AppState } from './../../services/app-state';
import { BaseService } from '../../services/base-service';
import { Router } from 'aurelia-router';

export class BaseCreateVM {
    public entity: any;
    constructor(protected mainService: BaseService,public router:Router, public appState: AppState) {}

    public activate() {    
        this.entity= {};
        this.appState.loadingMessage = '';
    }
    public submit() {
        this.mainService.save(this.entity).then(() => {
            this.router.navigate('');
        });
    }
}