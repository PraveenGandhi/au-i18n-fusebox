const { RawPlugin,FuseBox, JSONPlugin, HTMLPlugin,CSSPlugin, EnvPlugin, TerserPlugin, WebIndexPlugin } = require("fuse-box");
const { src, task } = require("fuse-box/sparky");
var TypeHelper = require('fuse-box-typechecker').TypeHelper
var autoLoadAureliaLoaders =function() {
    class loader {
        constructor() { }
        init(context) { }
        bundleEnd(context) {
            context.source.addContent(`FuseBox.import("fuse-box-aurelia-loader")`);
            context.source.addContent(`FuseBox.import("aurelia-bootstrapper")`);
            // context.source.addContent(`FuseBox.import("socket-io-client")`);
        }
    }
    return new loader();
}
task('typechecker', () => {
    var testWatch = TypeHelper({
        tsConfig: './tsconfig.json',
        name: 'Seed',
        basePath: './',
        tsLint: './tslint.json',
        shortenFilenames: true,
        yellowOnLint: true,
    })
    testWatch.runWatch('./src')
    return true;
});
let run = (production) => {
    let env = {
        FB_AU_LOG: !production,
        devMode: !production
    }
    const fuse = FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target:"browser@es6",
        runAllMatchedPlugins: true,
        plugins: [
            autoLoadAureliaLoaders(),
            production && TerserPlugin(),
            CSSPlugin(),
            EnvPlugin(env),
            HTMLPlugin(),
            JSONPlugin(),
            RawPlugin(['.css', '.woff','.png']),
            WebIndexPlugin({template:'./index.html'})
        ]
    });
    fuse.register('aurelia-semantic-ui', {
        homeDir: 'node_modules/aurelia-semantic-ui/dist/commonjs',
        main: 'index.js',
        // TODO: Nead a fix here to reduce bundle size
        instructions: `**/*.{html,css}`
    });
    fuse.register('semantic-ui', {
        homeDir: 'semantic/dist',
        main: 'semantic.min.js',
        instructions: '*.dummy'
    });
    fuse.register('jquery-nicescroll', {
      homeDir: 'node_modules/jquery.nicescroll/dist',
      main: 'jquery.nicescroll.min.js',
      instructions: '+zoomico.png'
    });
    fuse.register('socket-io-client', {
        homeDir: 'node_modules/socket.io-client/dist',
        main: 'socket.io.js',
        instructions: '*.dummy'
      });
    fuse.bundle("vendor")
        .cache(true)
        .instructions(`
        + @feathersjs/feathers
        + @feathersjs/socketio-client
        + @feathersjs/authentication-client
        + fuse-box-css
        + aurelia-bootstrapper
        + fuse-box-aurelia-loader
        + aurelia-framework
        + aurelia-i18n
        + aurelia-pal-browser
        + aurelia-logging-console
        + aurelia-templating-binding
        + aurelia-templating-resources
        + aurelia-event-aggregator
        + aurelia-history-browser
        + aurelia-templating-router
        + aurelia-semantic-ui
        + semantic-ui
        + socket-io-client
        + jquery-nicescroll`)
        .alias({
            'jQuery': 'jquery'
        })
        .shim({
            jquery: {
                source: 'node_modules/jquery/dist/jquery.js',
                exports: '$'
            }
        });
    if (!production) {
        fuse.bundle('app')
            .watch().hmr({reload : true})
            .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css,json}]
        `);
        fuse.dev();

    } else {
        fuse.bundle('app')
            //.watch().hmr({reload : true})
            .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css,json}]
        `);
        //fuse.dev();
    }
    fuse.run();
};
task('clean', async () => await src('dist/*').clean('dist').exec());
task('copy', async () => {
  await src('./favicon.ico').dest('./dist').exec();
  await src('./semantic/**').dest('./dist').exec();
  await src('./static/**').dest('./dist').exec();
});
task("dev",  ['clean','copy'
//, 'typechecker'
], () => run(false));
task("prod", ['clean','copy'], () => run(true));