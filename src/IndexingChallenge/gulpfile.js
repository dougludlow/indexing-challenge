'use strict';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cleanCss = require('postcss-clean'),
    Builder = require('jspm').Builder,
    browserSync = require('browser-sync').create(),
    Dotnet = require('gulp-dotnet');

var server,
    webroot = './wwwroot/',
    paths = {
        ts: webroot + 'app/**/*.ts',
        js: webroot + '**/*.js',
        scss: webroot + 'styles/*.scss',
        scripts: webroot + 'bundle.js',
        styles: webroot + 'styles/',
    };

gulp.task('default', ['sass', 'jspm']);
gulp.task('release', ['sass:release', 'jspm:release']);
gulp.task('jspm', ['jspm:debug']);
gulp.task('sass', ['sass:debug']);

gulp.task('serve', ['dotnet', 'sass', 'jspm'], function() {
    process.env.ASPNETCORE_ENVIRONMENT = 'development';
    browserSync.init({
        proxy: 'localhost:5000',
    });

    gulp.watch(paths.ts, ['jspm']);
    gulp.watch([paths.js, '!' + paths.scripts], ['jspm']);
    gulp.watch(paths.scss, ['sass']);
    gulp.watch('./**/*.cs', ['dotnet']);
    gulp.watch('./**/*.cshtml').on('change', browserSync.reload);
    gulp.watch(webroot + '**/*.html').on('change', browserSync.reload);;
});

gulp.task('serve:release', ['dotnet', 'sass:release', 'jspm:release'], function() {
    process.env.ASPNETCORE_ENVIRONMENT = 'production';
    browserSync.init({
        proxy: 'localhost:5000',
    });
});

gulp.task('dotnet', function(done) {
    if (!server)
        server = new Dotnet({ logLevel: 'debug' });
    server.start('run', done);
});

gulp.task('sass:debug', function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ]))
        .pipe(gulp.dest(paths.styles))
        .pipe(browserSync.stream());
});

gulp.task('sass:release', function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions']
            }),
            cleanCss()
        ]))
        .pipe(gulp.dest(paths.styles));
});

gulp.task('jspm:debug', ['sass:debug'], function (done) {
    var builder = new Builder(),
        options = {
            minify: false,
            sourceMaps: true
        };

    builder
        .bundle('indexing-challenge/**/* - [indexing-challenge/**/*] - [indexing-challenge/**/*.css!]', paths.scripts, options)
        .then(function () {
            browserSync.reload();
            done();
        });
});

gulp.task('jspm:release', ['sass:release'], function (done) {
    var builder = new Builder(),
        options = {
            minify: true,
            sourceMaps: false
        };

    builder
        .bundle('indexing-challenge', paths.scripts, options)
        .then(function () {
            done();
        });

    // builder
    //     .buildStatic('indexing-challenge', paths.scripts, options)
    //     .then(function () {
    //         browserSync.reload();
    //         done();
    //     });
});
