import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, // no info on command line as webpack runs
  publicPath: config.output.publicPath // pass it our pub path that we defined in webpack.config
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html')); // any requests received serve up index.html
});

app.listen(port, function(err) { // opens port 3000 (set above) as our port with local host
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
