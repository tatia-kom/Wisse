'use strict';

var raw = 'assets/';
var cooked = 'wp-content/themes/wisse/build/';
var gulp = require('gulp');
var rigger = require('gulp-rigger');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var es = require('event-stream');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var babel = require('gulp-babel');
var livereload = require('gulp-livereload');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var fs = require('fs');
var realFavicon = require('gulp-real-favicon');
var autoprefixer = require('gulp-autoprefixer');

const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const config = {

    server: {

        baseDir: "./wp-content/themes/wisse/build"

    },

    tunnel: false,

    host: 'localhost',

    port: 8080

};

var path = {
  src: {
    html: [raw + 'html/*.pug'],
    styles: [raw + 'stylesheets/@*.{scss,sass}', raw + 'stylesheets/**/@*.{scss,sass}'],
    js: raw + 'javascripts/**/@*.js',
    fonts: [raw + 'fonts/**/*.{eot,ttf,woff,woff2,svg}', '!' + raw + 'fonts/@*/*.svg'],
    img: [raw + 'img/**/*.{jpg,png,gif,svg}', '!' + raw + 'img/favicon.{jpg,png,gif,svg}'],
    favicon: raw + 'img/favicon.svg'
  },
  watch: {
    html: raw + 'html/**/*.pug',
    styles: raw + 'stylesheets/**/*.{sass,scss,css}',
    js: raw + 'javascripts/**/*.js',
    fonts: raw + 'fonts/**/*.{eot,ttf,woff,woff2,svg}',
    img: [raw + 'img/**/*.{jpg,png,gif,svg}', '!' + raw + 'img/favicon.{jpg,png,gif,svg}']
  },
  build: {
    html: cooked,
    styles: cooked,
    js: cooked,
    fonts: cooked + 'fonts',
    img: cooked + 'img',
    favicon: './'
  },
  favicon: {
    data_file: 'faviconData.json',
    files: ['./android-chrome-144x144.png', './android-chrome-192x192.png', './android-chrome-36x36.png', './android-chrome-48x48.png', './android-chrome-72x72.png', './android-chrome-96x96.png', './apple-touch-icon-114x114.png', './apple-touch-icon-120x120.png', './apple-touch-icon-144x144.png', './apple-touch-icon-152x152.png', './apple-touch-icon-180x180.png', './apple-touch-icon-57x57.png', './apple-touch-icon-60x60.png', './apple-touch-icon-72x72.png', './apple-touch-icon-76x76.png', './apple-touch-icon-precomposed.png', './apple-touch-icon.png', './assetimfavicon.svg', './browserconfig.xml', './favicon-16x16.png', './favicon-194x194.png', './favicon-32x32.png', './favicon-96x96.png', './favicon.ico', './faviconData.json', './manifest.json', './mstile-144x144.png', './mstile-150x150.png', './mstile-310x150.png', './mstile-310x310.png', './mstile-70x70.png', './safari-pinned-tab.svg'],
    inject: cooked + '/index.html'
  },
  clean: cooked
};

gulp.task('html:build', function () {
  return gulp.src(path.src.html).pipe(pug({pretty: true})).pipe(gulp.dest(path.build.html)).pipe(livereload());
});

gulp.task('styles:build', function () {
  return gulp.src(path.src.styles).pipe(sass().on('error', gutil.log)).pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  })).pipe(cssnano()).pipe(rename(function (path) {
    if (path.basename[0] === '@') {
      return path.basename = path.basename.slice(1);
    }
  })).pipe(gulp.dest(path.build.styles)).pipe(livereload());
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js).pipe(rigger()).pipe(babel({
    presets: ['env']
  })).pipe(uglify()).pipe(rename(function (path) {
    if (path.basename[0] === '@') {
      return path.basename = path.basename.slice(1);
    }
  })).pipe(gulp.dest(path.build.js)).pipe(livereload());
});

gulp.task('getIconfontName', function () {
  return gulp.src(path.src.iconfont).pipe(rename(function (file) {
    return path.iconfontname = file.dirname.slice(1);
  }));
});

gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts)).pipe(livereload());
});

gulp.task('img:build', function () {
  return gulp.src(path.src.img).pipe(imagemin({
    progressive: true,
    svgoPlugins: [
      {
        removeViewBox: false
      }
    ],
    use: [pngquant()]
  })).pipe(gulp.dest(path.build.img)).pipe(livereload());
});

gulp.task('clean', function () {
  return del(path.clean);
});

gulp.task('lr:listen', function () {
  return livereload.listen();
});

gulp.task('watch', function () {
  browserSync.init(config);

  gulp.watch(path.watch.html, ['html:build']).on('change', browserSync.reload);
  gulp.watch(path.watch.styles, ['styles:build']).on('change', browserSync.reload);
  gulp.watch(path.watch.js, ['js:build']).on('change', browserSync.reload);
  gulp.watch(path.watch.fonts, ['fonts:build']);
  gulp.watch(path.watch.img, ['img:build']).on('change', browserSync.reload);


});

gulp.task('build', ['html:build', 'styles:build', 'js:build', 'fonts:build', 'img:build']);

gulp.task('refresh', ['clean', 'build']);

gulp.task('default', ['lr:listen', 'build', 'watch']);

gulp.task('generate-favicon', function (done) {
  return realFavicon.generateFavicon({
    masterPicture: path.src.favicon,
    dest: path.build.favicon,
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '25%'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#2d89ef',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'backgroundAndMargin',
        margin: '23%',
        backgroundColor: '#ffffff',
        themeColor: '#ffffff',
        manifest: {
          name: 'gulp template',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#404040'
      }
    },
    settings: {
      compression: 2,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: path.favicon.data_file
  }, function () {
    return done();
  });
});

gulp.task('inject-favicon-markups', function () {
  return gulp.src(path.favicon.inject).pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(path.favicon.data_file)).favicon.html_code)).pipe(gulp.dest(path.build.html));
});

gulp.task('clean-favicon', function () {
  return del(path.favicon.files);
});
