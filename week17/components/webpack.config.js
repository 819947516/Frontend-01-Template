module.exports = {
    entry: './main.js',
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
            {
                test: /\.css/,  // 随便用什么 我用.vue有高亮舒服点 :)
                use:{
                    loader: require.resolve("./compiler/cssloader.js")
                }
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
};