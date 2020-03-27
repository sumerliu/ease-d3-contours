const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = ['dist'];

// the clean options to use
let cleanOptions = {
    root: path.resolve(__dirname),
    // exclude: ['shared.js'],
    verbose: true,
    dry: false,
};
module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: {
        d3: 'd3'
    },
    module: {
        rules: [
            {
                test: require.resolve('./src/index.ts'),
                use: [{
                  loader: 'expose-loader',
                  options: 'EaseD3Contours'
                }]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin({cleanOptions})
    ],

}
