const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [[
                            "@babel/plugin-transform-react-jsx",
                            {pragma:"create"}
                        ]]
                    }
                }
            }, 
            // {
            //     test: /\.css/,
            //     use: {
            //         loader: 'css-loader'
            //     } 
            // },
            // {
            //     test: /\.css/,
            //     use:{
            //         loader: require.resolve("./compiler/cssloader.js")
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        })
    ],
    mode: "development",
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: './src',
        compress: false,
    }
};