var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var del = require('del');

var merge = require('merge-stream');

gulp.task('default', function() {
  // place code for your default task here
  console.log("test test");
});

gulp.task("clean", function() {
	return del([
    "build/"
  ]);
});

gulp.task("concat", function() {
  return gulp.src([
	  	"src/styles/base.css", 
	  	"src/styles/helpers.css", 
	  	"src/styles/customs.css", 
	  	"src/styles/header.css", 
	  	"src/styles/introduction.css", 
	  	"src/styles/about.css", 
	  	"src/styles/gallery.css", 
	  	"src/styles/footer.css", 
	  	"src/styles/modal.css", 
	  	"src/styles/debugging.css"
		])
    .pipe(concatCss("css/styles.css")) //
    .pipe(gulp.dest('build/'));  //
});

gulp.task("copy", ["clean"], function() {
	return gulp.src([
			"src/images/**/*",
			"src/scripts/**/*",
			"src/index.html"
		], 
		{
			base: "src"
		})
		.pipe(gulp.dest("build/"));
});

gulp.task("build", ["clean"], function() {
	var cssConcat = gulp.src([
	  	"src/styles/base.css", 
	  	"src/styles/helpers.css", 
	  	"src/styles/customs.css", 
	  	"src/styles/header.css", 
	  	"src/styles/introduction.css", 
	  	"src/styles/about.css", 
	  	"src/styles/gallery.css", 
	  	"src/styles/footer.css", 
	  	"src/styles/modal.css", 
	  	"src/styles/debugging.css"
		])
    .pipe(concatCss("css/styles.css"))
    .pipe(gulp.dest('build/'));

  var copyFiles = gulp.src([
			"src/images/**/*",
			"src/scripts/**/*",
			"src/index.html"
		], 
		{
			base: "src"
		})
		.pipe(gulp.dest("build/"));

	return merge(cssConcat, copyFiles);
});

