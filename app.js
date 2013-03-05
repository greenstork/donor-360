var express = require('express'),
    nforce = require('nforce'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = module.exports = express.createServer();

var org = nforce.createConnection({
  clientId: '3MVG9rFJvQRVOvk6_n2pzKrRV2ru3BmcagvHlDKWKl_OD1G3Xyq5rRn4DVeeOdLlSC.NfxFjiG2iq6qLwBUGz',
  clientSecret: '8222817255741332338',
  redirectUri: 'http://localhost:3000/oauth/_callback'
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'nforce testing baby' }));
  app.use(org.expressOAuth({onSuccess: '/', onError: '/oauth/error'}));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/oauth/authorize', function(req, res){
  console.log('HITTING REDIRECT LINK');
  res.redirect(org.getAuthUri());
});

// JSON API

app.get('/api/search/:searchInput', api.search);

app.get('/api/donor-info/:id', api.getDonorInfo);
app.get('/api/donor-social/:id', api.getDonorSocial);
app.get('/api/donor-todo/:id', api.getDonorToDos);
app.get('/api/donor-timeline/:id', api.getDonorTimeline);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);