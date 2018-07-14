const fs = require('fs')
const path = require('path')

const dirPath = path.resolve(__dirname, '../articles')

/**
 * 读取文件目录下所有文件名称
 * @param {string} path - 文件夹路径
 * @returns {Promise}
 */
const readDir = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      !err
        ? resolve(files)
        : reject(err)
    })
  })
}

/**
 * 读取所有源文件
 * @returns {array}
 */
const main = async () => {
  const files = await readDir(dirPath);
  return files
    .filter(file => /\.md$/.test(file))
    .map(file => file.replace(/\.md$/, ''))
}

module.exports = main
