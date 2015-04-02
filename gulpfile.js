var gulp = require('gulp');
var concat = require("gulp-concat");
var sass = require('gulp-sass');

gulp.task("build", function() {
    //gulp.src("./src/sass/**/*.scss")
    //    .pipe(sass())
    //    .pipe(gulp.dest("./app/css"));

    gulp.src("./src/js/**/*.js")
        .pipe(gulp.dest("./app/js/"))
});