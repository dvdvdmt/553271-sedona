'use strict';

const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browser = require('browser-sync').create();
const del = require('del');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');
const posthtml = require('gulp-posthtml');
const posthtmlInclude = require('posthtml-include');

function clean() {
  return del(['build/']);
}

function copy() {
  return src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
  ], {
    base: 'source'
  })
    .pipe(dest('build/'));
}

function refresh(done) {
  server.reload();
  done();
}

function css() {
  return src('source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(dest('build/css'))
    .pipe(browser.stream());
}

function html() {
  return src('source/*.html')
    .pipe(posthtml([
      posthtmlInclude()
    ]))
    .pipe(dest('build/'));
}

function sprite() {
  return src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('icons-sprite.svg'))
    .pipe(dest('build/img'));
}

function server() {
  browser.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  watch('source/less/**/*.less', series(css));
  watch('source/img/icon-*.svg', series(sprite, html, refresh));
  watch('source/*.html', series(html, refresh));
}

const build = series(clean, copy, css, sprite, html);
exports.build = build;
exports.start = series(build, server);
exports.sprite = sprite;
