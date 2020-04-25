const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
var path = require('path');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/vistas'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'vistas/index.html'))
})

app.use(require('webpack-hot-middleware')(compiler));


const server = app.listen(3010, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('[DESARROLLO] SisPenna escuchando en http://%s:%s', host, port);
});
