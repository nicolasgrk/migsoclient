const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/User',
    createProxyMiddleware({
      target: 'http://localhost:8888/migso/api/src/controllers/',
      changeOrigin: true,
    })
  );

  app.use(
    '/Question',
    createProxyMiddleware({
      target: 'http://localhost:8888/migso/api/src/controllers/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Answer',
    createProxyMiddleware({
      target: 'http://localhost:8888/migso/api/src/controllers/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Compatibility',
    createProxyMiddleware({
      target: 'http://localhost:8888/migso/api/src/controllers/',
      changeOrigin: true,
    })
  );
};
