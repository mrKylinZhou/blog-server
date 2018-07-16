const fs = require('fs')
const path = require('path')

/**
 * 读取文件
 * @param {string} path - 文件夹路径
 * @returns {Promise}
 */
const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      !err
        ? resolve(data.toString())
        : reject(err)
    })
  })
}

/**
 * 读取所有源文件
 * @returns {array}
 */
const main = async name => {
  const filePath = path.resolve(__dirname, `../articles/${name}.md`)
  return await readFile(filePath)
}

module.exports = main
