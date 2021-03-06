var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
var PACKAGE = require('../package.json');
// 项目根路径
var ROOT_PATH = path.resolve(__dirname);
// 项目源码路径
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
// 产出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

// 从配置文件获取env or  直接从环境获取
var env = 'development';
// const __DEV__ = config.env === 'development';
var is_dev = process.env.NODE_ENV === 'development';

// let target = 'http://114.55.86.252:8080/mockjs/1/'; let target =
// 'http://192.168.3.82:8090/';
var target = 'https://uatyeeofficeworkflowcenter.yeeoffice.com/flowcraft/_api/ver(3.0)/';

var proxy = {};
var plugins = [
    new webpack.ProvidePlugin({
        "joint": "jointjs"
    }),
    new ExtractTextPlugin('app.css'),
    new HtmlWebpackPlugin({
        favicon: './favicon.ico', //favicon路径
        filename: '../index.html',
        template: "./src/index.html",
        inject: true,
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    })
]
if (is_dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    proxy = {
        "/api/*": {
            changeOrigin: true,
            target: target,
            secure: false
        },
        "/common/api/*": {
            target: target,
            secure: false
        }
    }
} else {
    plugins.push(new PrepackWebpackPlugin({}));
    plugins.push(new webpack.BannerPlugin({
        banner: `${PACKAGE.description}\r\n@version v${PACKAGE.version}\r\n@author @copyright 2017 ${PACKAGE.author} \r\n@link https://www.yeeoffice.com/\r\n@date ${new Date()}`,
        raw: false,
        entryOnly: false
    }));
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ch/));
}
var publicPath = "./index/";
var cdn = "./dist/";
var iconOSS = "//akmii-icon.oss-cn-shanghai.aliyuncs.com/";

if (process.env.NODE_ENV === 'uat') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/js/workflow3.0/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/";
} else if (process.env.NODE_ENV === 'uatv') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/js/workflow3.0/" + PACKAGE.version + "/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/";
} else if (process.env.NODE_ENV === 'dev') {
    publicPath = "//yeeoffice-mysql.oss-cn-hangzhou.aliyuncs.com/yeeoffice/dev/ver1.2/js/workflow3.0/";
    cdn = "//yeeoffice-mysql.oss-cn-hangzhou.aliyuncs.com/yeeoffice/dev/ver1.2/";
} else if (process.env.NODE_ENV === 'production') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/pub/ver1.0/js/workflow3.0/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/pub/ver1.0/";
}else if (process.env.NODE_ENV === 'aiib') {
    publicPath = "https://aiib02.sharepoint.com/sites/flow/Workflow/SitePages/pages/AIIB/";
}
console.log('JS资源地址：', publicPath);
plugins.push(new webpack.DefinePlugin({
    'process.env': {
        "IconOSS": JSON.stringify(iconOSS),
        "CDN": JSON.stringify(cdn),
    }
}));

module.exports = {
    devtool: is_dev ?
        'source-map' : "none",
    entry: {
        app: ['./src/app']
    },
    output: {
        path: is_dev ?
            "/" : BUILD_PATH,
        publicPath: is_dev ?
            '/' : publicPath,
        filename: is_dev ?
            '[name].js' : '[name].js',
        chunkFilename: is_dev ?
            '[name].js' : '[name]-' + process.env.NODE_ENV + '-[hash:5].js'
    },
    devServer: {
        proxy: proxy,
        host: '0.0.0.0'
    },
    module: {
        rules: [{
            test: /\.tsx|\.ts$/,
            exclude: /^node_modules$/,
            use: 'awesome-typescript-loader'
                // loader: 'ts-loader'
        }, {
            test: /\.(less|css)$/,
            exclude: /^node_modules$/,
            // loader: ExtractTextPlugin.extract('style-loader', "css-loader?minimize!less-loader?compress")
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('precss'),
                                require('autoprefixer')
                            ]
                        }
                    },
                    "less-loader"
                ]
            })
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: 'url-loader?limit=10000&name=img/[hash].[ext]'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: "file-loader"
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {}
    },
    externals: {}
}
