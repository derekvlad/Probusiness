const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const webpCss = require('gulp-webp-css')
const nunjucksRender = require('gulp-nunjucks-render');
const webpHtmlNosvg = require('gulp-webp-html-nosvg')
const del = require('del');
const browserSync = require('browser-sync').create();



function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
};

function nunjucks() {
    return src('app/*.njk')
        .pipe(nunjucksRender())
        .pipe(dest('app'))
        .pipe(browserSync.stream())
};
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())


}
function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'app/js/main.js'
    ])
        
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}


function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))

        .pipe(dest('dist/images'))
}

function webpHtml() {
    return src('./app/**.*.html')
        .pipe(webpHtmlNosvg())
        .pipe(dest('dist'))
}
function webpcss() {
    return src('app/css/style.min.css')
        .pipe(webpCss())
        .pipe(dest('dist/css/'))
}
function webpimage() {
    return src('app/images/**/*.*')
        .pipe(newer("app/images/**/*.*"))
        .pipe(webp())
        .pipe(dest('dist/images/'))
}
function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/fonts/*.*',
        'app/js/main.min.js'
    ], { base: 'app' })
        .pipe(webpHtmlNosvg())
        .pipe(webp())
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function waching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/**/*.njk'], nunjucks);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html'], webpHtml);
    watch(['app/**/*.html']).on('change', browserSync.reload,);

}


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.waching = waching;
exports.images = images;
exports.nunjucks = nunjucks;
exports.cleanDist = cleanDist;
exports.webpHtml = webpHtml
exports.webpcss = webpcss
exports.webpimage = webpimage
exports.build = series(cleanDist, images, build, webpimage, webpcss);


exports.default = parallel(nunjucks, styles, scripts, browsersync, waching);