var gulp = require('gulp'); //基础包
var  jshint = require("gulp-jshint"); //检测包
var  uglify = require("gulp-uglify"); //压缩
var  minifyCss = require("gulp-minify-css"); //css
var imagemin = require('gulp-imagemin'); //图片
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var  concat = require("gulp-concat"); //合并

var del = require("del"); //编译文件之前删除一些文件

 gulp.task('clean', function(cb) {
      return del(['www/dist/*'], cb);
});

 
gulp.task('jsLint', function () {
    gulp.src('www/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});

gulp.task('minify-js', function () {
    gulp.src('www/**/*.js') // 要压缩的js文件
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('www/dist')); //压缩后的路径
});

gulp.task('minify-css', function () {
    gulp.src('www/**/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(gulp.dest('dist'));
});

// gulp.task('minify-img', function () {
//     return gulp.src('www/*.png')
//         .pipe(imagemin({
//             progressive: true,
//             use: [pngquant()] //使用pngquant来压缩png图片
//         }))
//         .pipe(gulp.dest('dist'));
// });


gulp.task("serve", ["minify-js","minify-css"], function() {  

    gulp.watch('www/**/*.js', ["minify-js"]); //监听哪个目录的任务  
    gulp.watch('www/**/*.css', ["minify-css"]); 
  //  gulp.watch('www/img/*', ["minify-img"]);   
    // gulp.watch(path.HTML).on("change", function() { //当文件变化时，自动刷新  
     // browserSync.reload;  
    // }); 
});  

 gulp.task("default", ["serve"]);  
