const gulp = require('gulp')
const shell = require('gulp-shell')
const path = require('path')

const viewDir = path.resolve(__dirname, 'view')

gulp.task('start', () => {
  const nodemon = require('gulp-nodemon');
  nodemon({
    script: './index.js',
    ext: 'js',
    watch: ['./route/', './service', 'index.js', './db', './lib'],
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


gulp.task('rmdirView', shell.task([`rm -rf ${viewDir}`]))

gulp.task('mkdirView', ['rmdirView'], shell.task([`mkdir ${viewDir}`]))

const downFile = () => {
  return new Promise((resolve, reject) => {

  })
}

gulp.task('downFile', ['mkdirView'], () => {
  return downFile()
})
