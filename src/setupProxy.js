const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/User',
    createProxyMiddleware({
      target: 'https://migsoapi.000webhostapp.com/controllers/',
      changeOrigin: true,
    })
  );

  app.use(
    '/Question',
    createProxyMiddleware({
      target: 'https://migsoapi.000webhostapp.com/controllers/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Answer',
    createProxyMiddleware({
      target: 'https://migsoapi.000webhostapp.com/controllers/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Compatibility',
    createProxyMiddleware({
      target: 'https://migsoapi.000webhostapp.com/controllers/',
      changeOrigin: true,
    })
  );
};
