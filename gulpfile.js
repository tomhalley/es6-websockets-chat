var gulp = require('gulp');
var concat = require("gulp-concat");
var sass = require('gulp-sass');

var jsFiles = "./src/js/**/*.js",
    jsFilesDest = "./app/js/";

var sassFiles = "./src/sass/**/_*.scss",
    sassFilesDest = "./app/css/";

gulp.task("build:css", function() {
    return gulp.src(sassFiles)
        .pipe(concat("main.css"))
        .pipe(sass())
        .pipe(gulp.dest(sassFilesDest));
});

gulp.task("build:js", function() {
    return gulp.src(jsFiles)
        .pipe(concat("main.js"))
        .pipe(gulp.dest(jsFilesDest))
});

gulp.task("build", function() {
    gulp.start("build:js", "build:css");
});

gulp.task("watch:js", function() {
    return gulp.watch(jsFiles, ["build:js"])
});

gulp.task("watch:css", function() {
    return gulp.watch(sassFiles, ["build:css"])
});

gulp.task("watch", function() {
    gulp.start("watch:js", "watch:css");
});