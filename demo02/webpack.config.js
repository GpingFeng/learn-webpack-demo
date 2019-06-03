// const path = require('path')

// const CleanWebpackPlugin = require('clean-webpack-plugin')

// module.exports = {
//   entry: {
//     main: './src/index.js'
//   },
//   output: {
//     publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
//     path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
//     filename: '[name].bundle.js', // 代码打包后的文件名
//     chunkFilename: '[name].js' // 代码拆分后的文件名
//   },
//   plugins: [new CleanWebpackPlugin()]
//   // ,
//   // optimization: {
//   //   splitChunks: {
//   //     chunks: 'all' // 分割所有的代码，包括同步的代码和异步的代码
//   //   }
//   // }
// }


const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath:  '/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 代码打包后的文件名
    chunkFilename: '[name].js' // 代码拆分后的文件名
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000, // 本地服务器端口号
    hot: true, // 热重载
    overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
    proxy: {
      // 跨域代理转发
      '/comments': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          Cookie: ''
        }
      }
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  },
  mode: 'development',  // 开发模式
  devtool: 'source-map',  // 开启调试
  resolve: {
    alias: {
      jQuery$: path.resolve(__dirname, 'src/vendor/jquery.min.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/, // 针对.css 后缀文件设置 loader
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 
        'css-loader',
        // 使用 post-css 为 CSS 加上浏览器前缀
        {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        },
        'sass-loader'] // 使用 loader,放在最后的 loader 首先被执行，从上往下写的话是下面先执行，从左往右写的话是右边先执行。
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader
      //     },
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         name: '[name]-[hash:5].min.[ext]',
      //         outputPath: 'images/', // 输出到 images 目录
      //         limit: 2000 // 把小于 20 kb 的文件转换成 Base 64 格式
      //       }
      //     }
      //   ]
      // }
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              outputPath: 'images/', //输出到 images 文件夹
              limit: 2000 //把小于 20kb 的文件转成 Base64 的格式
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              plugins: {
                // 压缩 jpg/jpeg 图片
                mozjpeg: {
                  progressive: true,
                  quality: 65 // 压缩率
                },
                // 压缩 png 图片
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          }
        ]
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
      // chunks: 'all',
      // cacheGroups: {
      //   vendors: {
      //     name: 'vendors'
      //   }
      // }
  //   }
  // },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
      cacheGroups: {
        lodash: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: 5  // 优先级要大于 vendors 不然会被打包进 vendors
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          name: 'commons',
          minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
          minChunks: 2, // 最小公用次数
          priority: 5, // 优先级
          reuseExistingChunk: true // 公共模块必开启
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: '自动生成 HTML Gping',
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: 'index.html' // 根据此模版生成 HTML 文件
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
      canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    }),
    // 清除无用 css
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',  // npm 
      jQuery: 'jQuery'  // 本地 JavaScript 文件
    })
  ]
}
