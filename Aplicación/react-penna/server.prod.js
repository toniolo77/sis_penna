const express              = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack              = require('webpack');
const webpackConfig        = require('./webpack.production.config.js');
const app                  = express();
var path                   = require('path');

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/vistas'));

app.use(webpackDevMiddleware(compiler, {
  hot               : true,
  filename          : 'bundle.js',
  publicPath        : '/',
  stats             : {
        colors          : true,
  },
  historyApiFallback: true,
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'vistas/index.html'))
})

app.use(require('webpack-hot-middleware')(compiler));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

const server = app.listen(3010, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('[PRODUCCION] SisPenna escuchando en http://%s:%s', host, port);
});
