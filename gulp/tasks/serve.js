
const gulp = require('gulp');

const imageMinify = require('./imageMinify');
const svgSprite = require('./spriteSVG');
const pngSprite = require('./spritePNG');
const styles = require('./styles');
const html = require('./html');
const script = require('./scripts');
const { stream } = require('browser-sync');

const server = require('browser-sync').create();

// Запуск сервера а также слежка за файлами

module.exports = function serve(cb) {
  server.init({
    server: 'dist',
    notify: false,
    open: true,
    cors: true
  });

  gulp.watch('app/static/images/*/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify)).on('change', server.reload);
  gulp.watch('app/static/images/sprite/svg/*.svg', gulp.series(svgSprite)).on('change', server.reload);
  gulp.watch('app/static/images/sprite/png/*.png', gulp.series(pngSprite)).on('change', server.reload);
  gulp.watch('app/static/styles/**/*.scss', gulp.series(styles)).on('change', server.reload);
  gulp.watch('app/static/js/**/*.js', gulp.series(script)).on('change', server.reload);
  gulp.watch('app/html/**/*.html', gulp.series(html));
  gulp.watch('dist/*.html').on('change', server.reload);

  return cb()
};
