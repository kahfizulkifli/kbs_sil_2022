const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const K_HOST = 'localhost'
const K_PORT = 4010

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(K_PORT, K_HOST, function (err, result) {
  if (err) {
    return console.log(err)
  }

  console.log(`Listening at http://${K_HOST}:${K_PORT}/`)
})
