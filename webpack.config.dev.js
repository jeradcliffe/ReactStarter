import webpack from 'webpack';
import path from 'path';

export default {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: false, // if false webpack will list all files it is bundling
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
        path.resolve(__dirname, 'src/index') // path entry point (must be last in entry array b/c order matters)
    ],
    target: 'web',  // webpack bundles code for web specific environment
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src') // tells Webpacks devServer where the code actually is
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Allows us to replace modules without a full browser refresh
        new webpack.NoErrorsPlugin() // Allows a no throw on errors when hot reloading happens
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
            {test: /(\.css)$/, loaders: ['style', 'css']},

            // four items below are recommended settings as set by Bootstrap documentation
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};
