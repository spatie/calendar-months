const eslint = require('gulp-eslint');
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    gulp.start('build');
});

gulp.task('build', () => {
    return gulp.src('src/index.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('lib'));
});

gulp.task('test', () => {
    gulp.start('lint');
});

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});
