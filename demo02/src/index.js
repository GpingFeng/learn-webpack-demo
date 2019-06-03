// index.js
// import './a.js'
// import './b.js'

// // 异步代码
// function getComponent() {
//   // 使用异步的形式导入 lodash，default: _ 表示用 _ 代指 lodash
//   return import('lodash').then(({ default: _ }) => {
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['hello', 'world'], '-')
//     return element
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element)
// })

// import style from './css/base.css'
// import sass from './scss/main.scss'

// 异步代码
// import(/* webpackChunkName: 'a'*/ './a').then(function(a) {
//   console.log(a)
// })

// import(/* webpackChunkName: 'b'*/ './b').then(function(b) {
//   console.log(b)
// })

// import(/* webpackChunkName: 'use-lodash'*/ 'lodash').then(function(_) {
//   console.log(_.join(['1', '2']))
// })


// document.addEventListener('click', function() {
//   import(/* webpackChunkName: 'use-lodash'*/ 'lodash').then(function(_) {
//     console.log(_.join(['3', '4']))
//   })
// })


// document.addEventListener('click', function() {
//   const element = document.createElement('div')
//   element.innerHTML = 'Hello World11'
//   document.body.appendChild(element)
// })


// document.addEventListener('click', () => {
//   import('./click.js').then(({ default: func }) => {
//     func()
//   })
// })


// document.addEventListener('click', () => {
//   import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
//     func()
//   })
// })

// 测试 JS Tree-shaking
// import { a } from './vendor/util'
// console.log(a())
// import { chunk } from 'lodash-es'
// console.log(chunk([1, 2, 3], 2))

// 测试 CSS Tree-shaking
// app.js
// import base from './css/base.css'

// // 给 app 标签再加一个 div 并且类名为 box
// var app = document.getElementById('app')
// var div = document.createElement('div')
// div.className = 'box'
// app.appendChild(div)

// 图片处理
// import './css/base.css'

// app.js
$('div').addClass('new')

jQuery('div').addClass('old')

// 运行webpack后
// 浏览器打开 index.html, 查看 div 标签的 class

// webpack-dev-server
import sum from './vendor/sum'
console.log('sum(1, 2) = ', sum(1, 2))

var minus = require('./vendor/minus')
console.log('minus(1, 2) = ', minus(1, 2))

require(['./vendor/multi'], function(multi) {
  console.log('multi(1, 2) = ', multi(1, 2))
})

$.get(
  '/comments/hotflow',
  {
    id: '4263554020904293',
    mid: '4263554020904293',
    max_id_type: '0'
  },
  function(data) {
    console.log(data)
  }
)


if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept('./vendor/sum.js', function() {
    // 针对被更新的模块, 进行进一步操作
    console.log('/vendor/sum.js is changed')
  })
}