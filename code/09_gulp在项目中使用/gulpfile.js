const gulp = require('gulp');
const webpack = require('webpack-stream');
// const del = require('del');

const paths = {
  src: {
    js: 'src/**/*.js',
    css: 'src/**/*.css',
    html: 'src/index.html',
  },
  dest: 'dist',
};

// function clean() {
//   return del([paths.dest]);
// }

function js() {
  return gulp
    .src(paths.src.js)
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'js/app.js',
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(paths.dest));
}

function css() {
  return gulp.src(paths.src.css).pipe(gulp.dest(`${paths.dest}`));
}

function html() {
  return gulp.src(paths.src.html).pipe(gulp.dest(paths.dest));
}

function watch() {
  gulp.watch(paths.src.js, js);
  gulp.watch(paths.src.css, css);
  gulp.watch(paths.src.html, html);
}

// exports.clean = clean;
exports.js = js;
exports.css = css;
exports.html = html;
exports.watch = watch;

exports.default = gulp.series(gulp.parallel(js, css, html), watch);
