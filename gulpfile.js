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

gulp.task("build", function() {
	runSequence("clean", ["sass", "html", "js", "copy"]);
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
