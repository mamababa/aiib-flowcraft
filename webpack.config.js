var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var PACKAGE = require('./package.json');
// 项目根路径
var ROOT_PATH = path.resolve(__dirname);
// 项目源码路径
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
// 产出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var del = require('del');
del(BUILD_PATH)

// 从配置文件获取env or  直接从环境获取
var env = 'development';
// const __DEV__ = config.env === 'development';
var is_dev = process.env.NODE_ENV === 'development';

// let target = 'http://114.55.86.252:8080/mockjs/1/'; let target =
// 'http://192.168.3.82:8090/';
var target = 'https://uatyeeofficeworkflowcenter.yeeoffice.com/flowcraft/_api/ver(3.0)/';

var c = {};
var plugins = [
    new webpack.ProvidePlugin({
        "joint": "jointjs"
    }),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./node_modules/akmii-yeeoffice-common/dll/vendor-manifest.json')
    }),
    // new webpack.DllReferencePlugin({
    //     context: __dirname,
    //     manifest: require('./node_modules/akmii-yeeoffice-common/dll/antd-manifest.json')
    // }),
    new ExtractTextPlugin({
        filename: '[name].css'
    }),
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['crafts', 'common', 'antd'],
        minChunks: Infinity
    }),
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
    plugins.push(new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }
    }));
    // plugins.push(new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }));
    // plugins.push(new webpack.optimize.CommonsChunkPlugin({
    //     name: "crafts-common",
    //     chunks: ["akmii-crafts", "app"]
    // }));
    // plugins.push(new webpack.optimize.CommonsChunkPlugin({
    //     name: "common",
    //     chunks: ["akmii-common", "crafts-common"]
    // }));
    plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ch/));
}
var publicPath = "./index/";
var cdn = "./dist/";
var iconOSS = "//file.yeeoffice.com";

if (process.env.NODE_ENV === 'uat') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/js/workflow3.0/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/";
    // publicPath = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2hotfix/js/workflow3.0/";
    // cdn = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2hotfix/";
} else if (process.env.NODE_ENV === 'production') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/pub/ver3.0/js/workflow3.0/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/pub/ver3.0/";
} else if (process.env.NODE_ENV === 'aiib') {
    publicPath = "https://aiib365.sharepoint.com/sites/ipmtest/Workflow/SitePages/pages/AIIB/";
} else if (process.env.NODE_ENV === 'aiibdev') {
    publicPath = "https://akmiihk.sharepoint.com/sites/aiibflow/Workflow/SitePages/pages/dev/";
} else if (process.env.NODE_ENV === 'aiibuat') {
    publicPath = "https://akmiihk.sharepoint.com/sites/aiibflow/Workflow/SitePages/pages/AIIB/";
} else if (process.env.NODE_ENV === 'aiibpub') {
    publicPath = "https://aiib365.sharepoint.com/sites/ipm/Workflow/SitePages/pages/AIIB/";
}
console.log('JS资源地址：', publicPath);
plugins.push(new webpack.DefinePlugin({
    'process.env': {
        "IconOSS": JSON.stringify(iconOSS),
        "CDN": JSON.stringify(cdn)
    }
}));

module.exports = {
    devtool: is_dev ?
        'source-map' : "none",
    entry: {
        common: ['akmii-yeeoffice-common'],
        crafts: ['akmii-yeeoffice-crafts'],
        antd: ['antd'],
        app: ['./src/app'],

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
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: 'url-loader?limit=50000&name=[path][name].[ext]'
        }, {
            test: /\.(less|css)$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader",
                    "less-loader"
                ]
            })
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: [
            '.js', '.jsx', '.ts', '.tsx'
        ],
        // mainFields: ['jsnext:main', 'main'],
        alias: {}
    },
    externals: []
}
