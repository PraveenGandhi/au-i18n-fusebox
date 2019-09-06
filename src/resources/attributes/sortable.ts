import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@autoinject()
export class SortableCustomAttribute {
    order = 'asc';
    value;
    constructor(private element: Element, private router: Router, private ea: EventAggregator) {}

    attached() {
        this.element.addEventListener('click', () => {
            for (var e of this.element.parentElement.children) {
                e.classList.remove('sorted');
            }
            this.element.classList.add('sorted');
            this.element.classList.remove(this.order + 'ending');
            this.order = this.order === 'asc' ? 'desc' : 'asc';
            this.element.classList.add(this.order + 'ending');
            let data = {};
            data[this.value] = this.order === 'asc' ? 1: -1;
            this.ea.publish('sortingChanged', data);
        });
    }
}