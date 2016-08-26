var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var del = require('del');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var ext_replace = require('gulp-ext-replace');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
var awspublish = require('gulp-awspublish');

gulp.task("clean", function() {
	return del([
    "build/"
  ]);
});

gulp.task("html", function() {
  return gulp.src(
  	"src/index.html"
  	)
    .pipe(htmlreplace({
      // "css": "styles/style.min.css",
      "js": "scripts/app.js"
    }))
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.stream());
});

gulp.task("copy", function() {
	return gulp.src([
			"src/images/**/*",
			"src/fonts/*"
		], 
		{
			base: "src"
		})
		.pipe(gulp.dest("build/"));
});

gulp.task("sass", function() {
  return gulp.src("src/styles/style.scss")
    .pipe(sass().on("error", sass.logError))
    // .pipe(cleanCSS({keepSpecialComments: 0}))
    // .pipe(rename("styles/style.min.css")) //
    .pipe(gulp.dest("build/styles/"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
	return gulp.src("src/scripts/*.js")
		.pipe(concat("app.js"))
		.pipe(gulp.dest("build/scripts/"))
		.pipe(browserSync.stream());
});

gulp.task("watch", function () {
	livereload.listen();
  gulp.watch("src/styles/*.scss", ["sass"]);
  gulp.watch("src/index.html", ["html"]);
});

gulp.task("build", function(callback) {
	runSequence("clean", ["sass", "html", "js", "copy"], callback);
});

gulp.task("serve", ["build"], function() {

  browserSync.init({
      server: "./build",
      port: 1234
  });

  gulp.watch("src/styles/*.scss", ["sass"]);
  gulp.watch("src/index.html", ["html"]);
  gulp.watch("src/scripts/*.js", ["js"]);
});

gulp.task("_deploy", function() {
 
  // create a new publisher using S3 options 
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property 
  var publisher = awspublish.create({
    region: 'eu-central-1',
    params: {
      Bucket: 'emily-bucket'
    },
    accessKeyId: 'AKIAIE5R4UPHZF5LVHCQ',
    secretAccessKey: 'COZCJSg36f3ArNbLCSTY7CWAIH/1kMIEhIQALVEC'
  }, {
    cacheFileName: 'your-cache-location'
  });
 
  // define custom headers 
  var headers = {
    // max-age in seconds
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ... 
  };
 
  return gulp.src('./build/**/*')
     // gzip, Set Content-Encoding headers and add .gz extension 
    .pipe(awspublish.gzip())
 
    // publisher will add Content-Length, Content-Type and headers specified above 
    // If not specified it will set x-amz-acl to public-read by default 
    .pipe(publisher.publish(headers))
 
    // create a cache file to speed up consecutive uploads 
    .pipe(publisher.cache())
 
     // print upload updates to console 
    .pipe(awspublish.reporter());
});
 
// output 
// [gulp] [create] file1.js.gz 
// [gulp] [create] file2.js.gz 
// [gulp] [update] file3.js.gz 
// [gulp] [cache]  file3.js.gz 
// ... 

gulp.task("publish", function() {
  runSequence("build", "_deploy");
});

