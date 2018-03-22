module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{js,png,xml,ico,svg,html,json,css}",
  ],
  "swDest": "public/service-worker.js",
  "runtimeCaching": [{
    urlPattern: new RegExp('^https://media\.guim\.co\.uk/'),
    handler: 'staleWhileRevalidate'
  },
  {
    urlPattern: new RegExp('^https://content\.guardianapis\.com/'),
    handler: 'staleWhileRevalidate'
  }]
};