import {FeathersApi} from './feathers-api';
import { autoinject } from 'aurelia-framework';
import { BaseService } from './base-service';

@autoinject()
export class ProductsService extends BaseService{
    
    constructor(feathers:FeathersApi){
        super(feathers,'products');
    }
}