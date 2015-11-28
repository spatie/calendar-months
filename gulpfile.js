const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

require('babel-core/register');

gulp.task('build', () =>
    gulp.src('src/index.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);

gulp.task('lint', () =>
    gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
);

gulp.task('test', () =>
    gulp.start('lint')
        .start('test:unit')
);

gulp.task('test:unit', () =>
    gulp.src('test/**/*.js')
        .pipe(babel())
        .pipe(mocha())
);

gulp.task('test:watch', () => {
    gulp.start('test:unit');

    return gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test:unit']);
});
