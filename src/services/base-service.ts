import { FeathersApi } from './feathers-api';
import { Service, Params, Paginated, NullableId, Id } from '@feathersjs/feathers';

export class BaseService{
    public service:Service<any>;
    public editItem='';
    public viewItem='';
    constructor(feathers:FeathersApi,serviceName:string){
        this.service = feathers.client.service(serviceName)
    }

    get(id:Id,params?:Params):Promise<any>{
        return this.service.get(id,params);
    }

    find(criteria:Params):Promise<any[] | Paginated<any>>{
        return this.service.find(criteria);
    }

    save(word:Partial<any>,params?:Params):Promise<any>{
        return this.service.create(word,params);
    }

    update(word:any,params?:Params):Promise<any>{
        return this.service.update(word.id,word,params);
    }

    onCreated(callback:Function){
        this.service.on('created',message=>{
            callback(message);
        });
    }

    delete(id:NullableId,params?: Params):Promise<any>{
        return this.service.remove(id,params);
    }
}