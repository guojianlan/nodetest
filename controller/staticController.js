var gulp = require('gulp');
var webpack = require('gulp-webpack');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var Boom = require('boom');
var jsxLoader = require('jsx-loader');




exports.handleHtmlFile = function(req, resp) {
	var htmlPath = req.params.htmlPath;
	var absPath = path.join(__dirname, '/../views/' + htmlPath);
	var isExist = fs.existsSync(absPath);
	return isExist ? resp.view(htmlPath, {
		static_url: '127.0.0.1'
	}) : resp(Boom.notFound('missing'));
};

exports.handlerJsFile = function(req, reply) {
  var jsPath = req.params.jsPath,
    paths = jsPath.split('/'),
    basePath = path.join(__dirname, '/../assets/js/'),
    sourcePath = basePath + jsPath,
    desPath = basePath + jsPath.replace(/\.js/g, '.dev.js'),
    savePath = path.dirname(sourcePath),
    isExist = fs.existsSync(sourcePath);

  if (isExist) {
    // if the file from vendor file 
    // the it should not to be webpack it
    if (desPath.match(/vendor/g)) {
      return reply.file(sourcePath);
    }

    // clean old version
    gulp.src(desPath).pipe(rimraf());

    // create the new version of files
    var gulpStream = gulp.src(sourcePath)
      .pipe(webpack({
        module: {
          loaders: [{
            //tell webpack to use jsx-loader for all *.jsx files
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony'
          }]
        },
        debug: true,
        devtool: '#eval',
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      }))
      .pipe(rename(path.basename(desPath)))
      .pipe(gulp.dest(savePath));

    // output js file stream
    gulpStream.on('finish', function() {
      return reply.file(desPath);
    });
  } else {
    return reply(Boom.notFound('missin'));
  }
};
exports.handlePackFile = function(req, reply) {
  var filePath = req.params.filePath;
  var absPath = path.join(__dirname, '/../dist/' + filePath);
  console.log(absPath);
  var isExist = fs.existsSync(absPath);
  return isExist ? reply.file(absPath) : reply(Boom.notFound('missing'));
};