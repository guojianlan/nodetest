var firstModule = require('../first/firstModule');
var firstDemo = module.exports = function() {
  $(firstDemo.init);
  return firstDemo;
};
firstDemo.init= function(){
	new firstModule();
};