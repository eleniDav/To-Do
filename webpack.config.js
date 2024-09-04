const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist") 
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",  //3.inject style into DOM
                    "css-loader",    //2.turns css into js
                    "sass-loader"    //1.turns sass into css
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",  //2.inject style into DOM
                    "css-loader",    //1.turns css into js
                ],
            },
        ],
    },
    
}