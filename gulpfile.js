var gulp = require('gulp'),
//  sass = require('gulp-sass');
 bundle = require('gulp-bundle-assets');
var concat = require('gulp-concat');
gulp.task('bundle',function(){
    return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('.dist/'));
})
// gulp.task('sass', function() {
//     gulp.src('assets/styles/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest(function(f) {
//             return f.base;
//         }))
// });
// gulp.task('default', function () {
//     gulp.watch('assets/styles/*.scss', ['sass']);
//   });
// gulp.task('bundle', function() {
//   return gulp.src('./assets/scripts/*.js')
//     .pipe(bundle())
//     .pipe(gulp.dest('./public/'));
// });
gulp.task('default', ['bundle'],function(){
    gulp.watch('./bundle.config.js' , ['bundle']);
})