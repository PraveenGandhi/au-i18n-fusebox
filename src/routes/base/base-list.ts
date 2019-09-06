import { AppState } from './../../services/app-state';
import { Subscription, EventAggregator } from 'aurelia-event-aggregator';
import { BaseService } from '../../services/base-service';

export class BaseListVM {
    protected isLoading = false;
    protected entities: any;
    protected subscriber: Subscription;

    constructor(private type:string, protected mainService: BaseService, private ea: EventAggregator, public appState: AppState) {}

    attached() {
        this.subscriber = this.ea.subscribe('sortingChanged', data => {
            this.isLoading = true;
            this.mainService.find({
                query: {
                    $sort: data
                }
            }).then((d) => {
                this.entities = d;
                this.isLoading = false;
            });
        });
    }
    async activate() {
        this.appState.loadingMessage = `Loading ${this.type}..!`;
        this.mainService.onCreated(word => {
            this.entities.data.push(word);
        });
        return this.mainService.find({}).then((d) => {
            this.entities = d;
            this.appState.loadingMessage = '';
        });
    }

    deactivate() {
        this.subscriber.dispose();
    }
}