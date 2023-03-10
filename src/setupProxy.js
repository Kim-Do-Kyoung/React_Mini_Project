const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/test', {
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/':''
      },
      changeOrigin: true
    })
  )
};