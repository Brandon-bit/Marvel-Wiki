const {src, dest, watch, parallel} = require ("gulp");

// CSS dependencias
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemap = require("gulp-sourcemaps");

// Imagenes 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// JS dependencias
const terser = require("gulp-terser-js");



// TAREAS

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg,PNG}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}

function css(done){
    src('src/scss/**/*.scss') // Identifica el archivo
        .pipe(sourcemap.init())
        .pipe(plumber())
        .pipe(sass()) // Ejecuta la dependencia  
        /*.pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemap.write('.'))*/
        .pipe(dest("build/css")); // Lo guarda en la carpeta seleccionada

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        /*.pipe(sourcemap.init())
        .pipe(terser())
        .pipe(sourcemap.write('.'))*/
        .pipe(dest('build/js'));

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.dev = parallel( dev, javascript, css, imagenes );