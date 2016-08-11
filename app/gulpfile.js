var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

gulp.task('default', function() {
  // place code for your default task here
  console.log("test test");
});

gulp.task('concat', function () {
  return gulp.src([
  	"styles/base.css", 
  	"styles/helpers.css", 
  	"styles/customs.css", 
  	"styles/header.css", 
  	"styles/introduction.css", 
  	"styles/about.css", 
  	"styles/gallery.css", 
  	"styles/footer.css", 
  	"styles/modal.css", 
  	"styles/debugging.css"
	])
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('out/'));
});