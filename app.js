//declaration
var express 		= require('express');
var path 			= require('path');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var home 			= require('./controllers/home');
var reg 			= require('./controllers/reg');
var topics 			= require('./controllers/topics');
var group 			= require('./controllers/group');
var cngPass 		= require('./controllers/changePassword');
var research 		= require('./controllers/myResearch');
var upload 			= require('./controllers/upload');
var download 		= require('./controllers/download');

var app = express();

//configuration
app.set('view engine', 'ejs');

//middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use('/login', login);
app.use('/', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/cngPass', cngPass);
app.use('/upload', upload);
app.use('/download', download);
app.use('/reg', reg);
app.use('/topics', topics);
app.use('/research', research);
app.use('/group', group);


//routes
app.get('/', function(req, res){
	res.render('index');
});

//server startup
app.listen(4000, function(){
	console.log('server started at 4000!');
});
