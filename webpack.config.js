path = require('path');

var htmlwp = require('html-webpack-plugin');


var webpack = require('webpack');
// 配置文件在控制台上使用webpack，会默认查找webpack.sonfig.js的配置文件去执行
module.exports = {
    // 1.配置打包时的入口文件
    entry: './src/main.js',

    // 配置打包时生成文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'build.js'
    },

    resolve: {
        alias: {
            // webpack 使用 jQuery，如果是自行下载的
            // 'jquery': path.join(__dirname, 'jquery所在的目录/jquery.min'),
            // 如果使用NPM安装的jQuery
            'jquery': 'jquery'
        }
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|ttf|woff|eot|svg)$/,
                // loader: ['url-loader']

                loader: ['url-loader?limit=10240']
            },

            // 配置vue文件打包正则
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            { test: / iview.src.*js$/, loader: 'babel-loader' },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index1.html'
        }),
        // 配置$指向 jquery对象的,在任何组件中均可以使用 $()和jQuery()两种写法
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}