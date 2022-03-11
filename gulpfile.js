'use strict';

const {
    src,
    dest,
    series,
    watch,
    task
} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const sassGlob = require('gulp-sass-glob');
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const jsminify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const sync = require('browser-sync').create()

//localization
const i18n = require('gulp-html-i18n')

function html() {
    return src('src/html/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist/html'))
}

function scss() {
    return src('src/style/scss/*.{scss,sass}')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({
            Browserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist/style'))
}

function js() {
    return src(['src/scripts/*.js'])
        .pipe(jsminify())
        .pipe(dest('dist/scripts'))
}

function imgSquash() {
    return src('src/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

function localize() {
    return src('src/html/main/*')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(i18n({
            langDir: 'src/lang',
            trace: true,
            createLangDirs: true
        }))  
        .pipe(dest('dist'));
}

function localizeDefault() {
    return src('src/html/main/*')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(i18n({
            langDir: 'src/lang',
            trace: true,
            inline: "en"
        }))
        .pipe(dest('dist'));
}

function jsonImport() {
    return src('src/json/*.json')
    .pipe(dest('dist/json'));
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/html/**', series(html, localize, localizeDefault)).on('change', sync.reload)
    watch('src/style/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/scripts/*', series(js)).on('change', sync.reload)
    watch('src/img/*', series(imgSquash)).on('change', sync.reload)
    watch('src/json/*', series(jsonImport)).on('change', sync.reload)

}

task('serve', series(clear, html, scss, js, imgSquash, localize, localizeDefault, jsonImport, serve));
task('build', series(clear, html, scss, js, imgSquash, localize, localizeDefault, jsonImport))
task('clear', clear)