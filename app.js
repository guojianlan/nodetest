var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
server.connection({ 
    host: 'localhost', 
    port: 1554 
});
require('./routes/')(server);
server.views({
	engines: {
		html: require('ejs')
	},
	path: path.join(__dirname, '/./views'),
	isCached: false
});
server.start(function() {
	console.log('server start at port: %s', server.info.uri);
});
