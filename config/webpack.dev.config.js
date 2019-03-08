var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname);
// 项目源码路径
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
// 产出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');


// 从配置文件获取env or  直接从环境获取
var env = 'development';
// const __DEV__ = config.env === 'development';
var is_local = process.env.NODE_ENV === 'local';
var is_dev = process.env.NODE_ENV === 'development' || is_local;

// let target = 'http://114.55.86.252:8080/mockjs/1/'; let target =
// 'http://192.168.3.82:8090/';
var target = 'https://uatyeeofficeworkflowcenter.yeeoffice.com/flowcraft/_api/ver(3.0)/';

var proxy = {};
var plugins = [
    new webpack.ProvidePlugin({ "joint": "jointjs" }),
    new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../node_modules/akmii-yeeoffice-common/dll/vendor-manifest.json') }),
    // new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../dll/flowcraft-manifest.json') }),
    // new ExtractTextPlugin('app.css'),
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
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            "RemoveMasterPage": is_local
        }
    }));
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
    // plugins.push(new webpack.optimize.CommonsChunkPlugin({     name:
    // "akmii-common",     chunks: ["vendors", "app"] })); plugins.push(new
    // webpack.optimize.CommonsChunkPlugin({     name: "common",     chunks:
    // ["antd", "akmii-common"] }));
    plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ch/));
}

var publicPath = "./dist/";
var cdn = "//yeeoffice-mysql.oss-cn-hangzhou.aliyuncs.com/yeeoffice/dev/ver1.2/";
var iconOSS = "//akmii-icon.oss-cn-shanghai.aliyuncs.com/";

if (process.env.NODE_ENV === 'uat') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/js/workflow3.0/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/uat/ver1.2/";
} else if (process.env.NODE_ENV === 'dev') {
    publicPath = "//yeeoffice-mysql.oss-cn-hangzhou.aliyuncs.com/yeeoffice/dev/ver1.2/js/workflow3" +
        ".0/";
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
        "CDN": JSON.stringify(cdn),
        "IconOSS": JSON.stringify(iconOSS)
    }
}));
plugins.push(new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../node_modules/akmii-yeeoffice-common/dll/vendor-manifest.json') }));
plugins.push(new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../dll/flowcraft-manifest.json') }))
    // new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../node_modules/akmii-yeeoffice-common/dll/vendor-manifest.json') }),
    // new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../dll/flowcraft-manifest.json') }),

var port = 8080;
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
            'https://127.0.0.1:' + port + '/' : publicPath,
        filename: is_dev ?
            '[name].js' : '[name].js',
        chunkFilename: is_dev ?
            '[name].js' : '[name]-' + process.env.NODE_ENV + '-[hash:5].js'
    },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        proxy: proxy,
        // compress: true,
        host: '0.0.0.0',
        port: port,
        https: true
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
            test: /\.less|\.css$/,
            exclude: /^node_modules$/,
            // loader: ExtractTextPlugin.extract('style-loader',
            // "css-loader?minimize!less-loader?compress")
            use: ["style-loader", "css-loader", "less-loader"]
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: [
            '.js', '.jsx', '.ts', '.tsx'
        ],
        alias: {
            "react-router": "react-router/umd/ReactRouter.min.js",
            'jointjs': 'jointjs/dist/joint.min'
        },
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    externals: []
}
