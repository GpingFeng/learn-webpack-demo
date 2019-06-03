const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'root',  // root 可以随便更换，不是固定值
    libraryTarget: 'umd'
  }
}