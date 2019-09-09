import { Aurelia } from 'aurelia-framework';
import { AppState } from './services/app-state';
import { Container } from 'aurelia-dependency-injection';
import { TCustomAttribute} from 'aurelia-i18n';
import * as XHR from 'i18next-xhr-backend';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('resources/index')
        .plugin('aurelia-semantic-ui')
        .plugin('aurelia-i18n', (instance) => {
            let aliases = ['t', 'i18n'];
            // add aliases for 't' attribute
            TCustomAttribute.configureAliases(aliases);
      
            // register backend plugin
            instance.i18next.use(XHR);
      
            // adapt options to your needs (see http://i18next.com/docs/options/)
            // make sure to return the promise of the setup method, in order to guarantee proper loading
            return instance.setup({
              backend: {                                  // <-- configure backend settings
                loadPath: 'static/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
              },
              attributes: aliases,
              lng : 'jp',
              fallbackLng : 'en',
              debug : true
            });
          });

    await aurelia.start();
    await aurelia.setRoot('shells/launched');
    const appState: AppState = Container.instance.get(AppState);

    await appState.authenticateByJWT()
        .then(()=> {            
            aurelia.setRoot('shells/app');
        }).catch(e => {
            console.log(e);
            aurelia.setRoot('shells/login');
        });
}