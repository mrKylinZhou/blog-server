const gulp = require('gulp')

gulp.task('start', () => {
  const nodemon = require('gulp-nodemon');
  nodemon({
    script: './index.js',
    ext: 'js',
    watch: ['./route', './service', 'index.js', './lib', './models'],
    env: {
        NODE_ENV: 'development'
    }
  }).on('quit', function() {
    process.exit()
  }).on('restart', function(files) {
    console.log(files + ' is changed')
    console.log('Server will restart')
    console.log('\n')
  })
})
