const path = require('path');
module.exports = {
    entry: ["@babel/polyfill", "./src/app/index.js"],
    output: {
        path: path.join(__dirname, '/src/public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|css)$/,
                use:['babel-loader'],
                exclude: /node_modules/
            },
            { 
                test: /\.css$/, 
                use: [ 'style-loader','css-loader']
            },
            {
                test: /\.svg$/,
                use: ['svg-url-loader']
            }
        ]
    }
}