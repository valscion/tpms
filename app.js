
var express = require('express')
, passport = require('passport')
, routes = require('./routes')
, async = require('async')
//, db = require('./db')
, connect = require('connect')
, Log = require('log')
//, users = require('./users')
//, Schema = mongoose.Schema
, config = require('./config')
, LocalStrategy = require('passport-local').Strategy
, log = new Log('DEBUG');

var app = express.createServer();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: config.pms.secret  }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));	
});

app.configure('production', function(){
});

app.dynamicHelpers({
	flash : function (req, res) {
		return req.flash();
	}
});

app.get('/', function(req, res) {
	//res.send('hai');
//	res.redirect('/compo/view/all');
	routes.listCompos(req, res);
});

app.get('/compo/view/all', routes.listCompos);
app.get('/compo/view/:componame', routes.viewCompo);
app.get('/compo/create', routes.compoForm);
app.post('/compo/create', routes.createCompo);

app.get('/entry/submit/:componame', routes.entryForm);
app.post('/entry/submit/:componame', routes.submitEntry);
app.get('/entry/view/:entryname', routes.viewEntry);

app.listen(3000);
log.debug('started');
