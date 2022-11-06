import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

import GulpPostCss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import sourcemaps from "gulp-sourcemaps";

export const css = () => {
  return gulp
    .src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(GulpPostCss([autoprefixer(), cssnanoPlugin()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"));
};

export const watchFiles = () => {
  gulp.watch("src/scss/**/*.scss", css);
};

const build = gulp.series(css, watchFiles);

export default build;
