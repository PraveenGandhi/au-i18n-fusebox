import { AppState } from './../../services/app-state';
import { BaseService } from "../../services/base-service";
import { Router } from "aurelia-router";

export class BaseViewVM {
    protected entity: any;
    protected promises: Promise < any > [] = [];
    protected promisesAdded: boolean;
    constructor(private type: string, protected mainService: BaseService, public router: Router, public appState: AppState) {}

    async activate(params: any) {
        this.appState.loadingMessage = `Loading ${this.type} details..!`;
        if (!this.promisesAdded) {
            let promise = this.mainService.get(params.id).then((d) => {
                this.entity = d;
                this.mainService.viewItem = this.entity.text;
                this.appState.loadingMessage = '';
            });
            this.promises.push(promise);
        }
        return this.promises;
    }

    detached(){
        this.mainService.viewItem='';
    }

    delete() {
        if (!confirm('Are you sure?')) return;
        this.mainService.delete(this.entity.id).then((d) => {
            this.router.navigate('');
        });
    }
}