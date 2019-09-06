import { AppState } from './../services/app-state';
import { AuthorizeStep } from './../services/authorize-step';
import { autoinject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { RouterConfiguration } from 'aurelia-router';
import 'jquery-nicescroll';
import 'semantic-ui';

declare var $: any;

@autoinject()
export class App {
  public router: Router;

  constructor(private appState:AppState, private aurelia:Aurelia){}
  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'App';
    config.options.root = '/';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['','dashboard'],name: 'dashboard',      moduleId: '../routes/dashboard/dashboard',  title: 'ダッシュボード', nav: true, settings: {icon:'chart line'} },
      { route: '/settings',     name: 'settings',       moduleId: '../routes/settings/settings',  title: '設定',nav: true, settings: {icon:'cogs'}  },
    ]);
    config.fallbackRoute('dashboard');
    this.router = router;
  }

  public attached() {
    $('a.launch.icon.item').on('click', function () {
      $('#toc.ui.sidebar').sidebar('toggle');
    });
    $('#toc.ui.sidebar a').on('click', function () {
      $('#toc.ui.sidebar').sidebar('toggle');
    });
    $('body').niceScroll({autohidemode: true});
    $('.hamburger').on('click', function () {
      if ('show' === $(this).data('name')) {
        $('.toc, .logo').animate({
          width: '175px'
        }, 350);
        $(this).data('name', 'hide');
      } else {
        $('.toc, .logo').animate({
          width: '235px'
        }, 350);
        $(this).data('name', 'show');
      }
    });
  }
  public logout() {
    this.appState.logout().then(()=>{
      this.aurelia.setRoot('shells/login');
    });
  }
}