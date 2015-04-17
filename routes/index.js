var staticController = require('../controller/').static;
module.exports = function(server) {
	server.route([{
		method: 'GET',
		path: '/js/{jsPath*}',
		handler: staticController.handlerJsFile
	}, {
		method: 'GET',
		path: '/{htmlPath*}',
		handler: staticController.handleHtmlFile
	},
	{
		method:'GET',
		path:'/dist/{filePath*}',
		handler: staticController.handlePackFile
	}]);
};