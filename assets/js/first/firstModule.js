var $ = require('jquery');
var _ = require('lodash');
var htmlTemplate = require('html!./first.html');
var firstModule = module.exports = function() {
	this.init();
};
var p = firstModule.prototype;

p.init = function() {
	console.log(111111111);
	this.render();
};
p.render = function() {
	if (_.isFunction(this.beforeRender)) this.beforeRender();
	if (_.isFunction(this.afterRender)) this.afterRender();
};
p.beforeRender = function() {
	this.renderTemplate();
};

p.renderTemplate = function() {
	var compiled = _.template(htmlTemplate);
	$('#ceshi').append(compiled({
		id: 1
	}));
	this.afterRender();
};
p.afterRender = function() {

};