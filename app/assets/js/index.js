require.config({
  paths: {
    'jquery': '/assets/vendor/jquery/dist/jquery.min',
    'jquery.serializeJSON': '/assets/vendor/jquery.serializeJSON/jquery.serializejson.min'
  },
  shim: {
    'jquery.serializeJSON': ['jquery']
  }
});

require([
  // ...
], function () {
  console.info('App started...');
});
