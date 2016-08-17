var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var del = require('del');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var ext_replace = require('gulp-ext-replace');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task("clean", function() {
	return del([
    "build/"
  ]);
});

/*gulp.task("css", function() {
  return gulp.src([
	  	"node_modules/font-awesome/css/font-awesome.css",
  		"node_modules/sanitize.css/sanitize.css",
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
    .pipe(cleanCSS({keepSpecialComments: 0}))
    .pipe(rename("css/styles.min.css"))
    .pipe(gulp.dest("build/"));
});*/

gulp.task("html", function() {
  return gulp.src(
  	"src/index.html"
  	)
    .pipe(htmlreplace({
      "css": "styles/style.min.css"
    }))
    .pipe(gulp.dest("build/"));
});

gulp.task("copy", function() {
	return gulp.src([
			"src/images/**/*",
			"src/scripts/**/*",
			"src/fonts/*"
		], 
		{
			base: "src"
		})
		.pipe(gulp.dest("build/"));
});

gulp.task("sass", function() {
  return gulp.src("src/styles/style.scss")
    .pipe(sass({

    }).on("error", sass.logError))
    .pipe(cleanCSS({keepSpecialComments: 0}))
    .pipe(rename("styles/style.min.css")) //
    .pipe(gulp.dest("build/"))
    .pipe(livereload());
});

gulp.task("build", function() {
	// runSequence("clean", ["css", "replace", "copy"]);
	runSequence("clean", ["sass", "replace", "copy"]);
});

gulp.task("watch", function () {
	livereload.listen();
  gulp.watch("src/styles/*.scss", ["sass"]);
  gulp.watch("src/index.html", ["replace"]);
});

/*gulp.task("changeExt", function() {
  gulp.src("src/styles/*.css")
      .pipe(ext_replace(".scss"))
      .pipe(gulp.dest("src/styles/"))
});*/
