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
	}]);
};