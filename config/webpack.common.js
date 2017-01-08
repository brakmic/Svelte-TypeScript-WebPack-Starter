const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

/*
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  port: 3000,
  host: 'localhost',
  title: 'svelte-demo1',
  urlPrefix: '/',
  baseUrl: '',
  isDevServer: helpers.isWebpackDevServer(),
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
 var isProd = options.env === 'production';
 return {

   /*
   * The entry point for bundles
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'polyfills': './src/init/polyfills.ts',
    'vendor': './src/init/vendor.ts',
    'main': './src/init/main.ts'
  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.node'],

    // An array of directory names to be resolved to the current directory
    modules: [
        helpers.root('src'),
        helpers.root('src/app'),
        helpers.root('src/init'),
        helpers.root('src/vendor'),
        helpers.root('src/app/styling'),
        helpers.root('node_modules')
    ],
    alias: {
      'lodash': helpers.root('node_modules/lodash/index.js'),
      'config.json': helpers.root('src/config.json')
    },

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    rules: [
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      /*
      * Parse Svelte components
      * See: https://github.com/sveltejs/svelte-loader
      */ 
      {
        test: /\.sve$/,
        use: 'svelte-loader',
        exclude: /node_modules/
      },
      {
          test: /datatables\.net.*/,
          use: 'imports-loader?define=>false'
      },
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      /*
       * Raw loader support for *.css files
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'raw-loader', 'css-loader']
      },
      /*
      * Load Sass Styles
      * See: See: https://github.com/jtangelder/sass-loader
      */
      {
        test: /\.scss$/,
        use: ['to-string-loader','raw-loader', 'sass-loader']
        // loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /index\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallbackLoader: 'style-loader',
            exclude: /node_modules/,
            loader: 'css-loader!sass-loader?sourceMap'
          })
      },
      {
        test: /\.woff(2)?(\?v=.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=.+)?$/,
        use: 'file-loader'
      },
      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      /* File loader for supporting images, for example, in CSS files.
      */
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }
    ]
  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [


    new ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({
      options: {
          METADATA: METADATA,
          context: __dirname,
          output: {
            path: helpers.root('dist')
          },
          alias: {
          }
      }
    }),

    new ExtractTextPlugin({ filename: 'index.css', disable: false, allChunks: true }),

    new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
    }),

    new DashboardPlugin(),
     /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules\//.test(module.resource)
      }),
    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([
        {
          from: 'src/config.json'
        },
        {
          from: 'src/assets',
          to: 'assets'
        },
        {
          from: 'src/vendor',
          to: 'vendor'
        },
        {
          from: './favicon.ico'
        },
        ], {
          ignore: [
            'humans.txt',
            'robots.txt'
        ]
      }),

      new CopyWebpackPlugin([{
        from: 'src/assets/robots.txt'
      }, {
        from: 'src/assets/humans.txt'
      }]),

    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: METADATA.title,
      isDevServer: METADATA.isDevServer,
      favicon: 'favicon.ico',
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),

    /*
    * Plugin: ScriptExtHtmlWebpackPlugin
    * Description: Enhances html-webpack-plugin functionality
    * with different deployment options for your scripts including:
    *
    * See: https://github.com/numical/script-ext-html-webpack-plugin
    */
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    /*
     * Plugin: HtmlHeadConfigPlugin
     * Description: Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     * Example:
     *  Adding this plugin configuration
     *  new HtmlElementsPlugin({
     *    headTags: { ... }
     *  })
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    dns: 'mock',
    net: 'mock'
  }

 };
};
