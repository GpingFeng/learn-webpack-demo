/**
 * webpack 支持 ES6、CommonJs 和 AMD 规范
 */

// ES6
// import sum from './vendor/sum'
// console.log('sum(1, 2) = ', sum(1, 2))

// // CommonJs
// var minus = require('./vendor/minus')
// console.log('minus(1, 2) = ', minus(1, 2))

// AMD
// require(['./vendor/multi'], function(multi) {
//   console.log('multi(1, 2) = ', multi(1, 2))
// })


/**
 * webpack 使用 babel 7 打包
 */

 // 全局引入
// import '@babel/polyfill'

// 测试 ES6 语法是否通过 babel 转译
const array = [1, 2, 3]
const isES6 = () => console.log(...array)

isES6()

const arr = [new Promise(() => {}), new Promise(() => {})]

arr.map(item => {
  console.log(item)
})


