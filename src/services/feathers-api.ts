import * as feathers from '@feathersjs/feathers';
import * as auth from '@feathersjs/authentication-client';
import * as socketio from '@feathersjs/socketio-client';

export class FeathersApi {
  client:feathers.Application;
  constructor() {
    this.client = feathers.default()
    let baseUrl = window.location.hostname=== 'localhost'?'http://localhost:3030': 'http://192.168.100.165:3030';
    //let rest = require('@feathersjs/rest-client')(baseUrl);
    const socket = require('socket-io-client')(baseUrl);

    this.client
        .configure(socketio.default(socket))
        //.configure(rest.fetch(window.fetch))
        //.configure(feathers.hooks())
        .configure(auth.default(<any>{ storage: window.localStorage }));
  }
}