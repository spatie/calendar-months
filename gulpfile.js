const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const process = require('process');
require('babel-core/register');

const WATCHING = process.argv.indexOf('--watch') !== -1;

gulp.task('build', () =>
    gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);

gulp.task('lint', () =>
    gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('test', () => {

    const test = () =>
        gulp.src('test/**/*.js')
            .pipe(babel())
            .pipe(mocha())
    ;

    if (WATCHING) {
        test().on('error', () => {});
        return gulp.watch(
            ['src/**/*.js', 'test/**/*.js'],
            () => test().on('error', (error) => {
                console.log(error);
            })
        );
    }

    return test().on('error', (error) => {
        console.log(error);
        process.exit(1);
    });
});
