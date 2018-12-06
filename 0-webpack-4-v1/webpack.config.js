// require path to resolve file path
const path = require('path');

// TREE SHAKING
// bundle analyzer plugin is for Tree Shaking - by default it shakes all extra stuff that is not being used from a library
// to Tree Shake only the libraries that are not being used at all but are included in system use side effects like below
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// above plugin will open http://127.0.0.1:8888/ when u start dev-server along with index.html to show tree shaking results

module.exports = {

    // debugging // finding code errors in source maps
    // go to exact line in exact file // below is the setting
    devtool: "cheap-module-eval-source-map",

    // entry file/point
    entry: './src/index.js',
    output: {
        // path to dist folder
        path: path.resolve(__dirname, 'dist'),
        // name for output file
        filename: "bundle.js"
    },
    // above config is sufficient to run webpack for js files into bundle
    // sevServer just is here to serve the content at http://localhost:3000 
    // if we need hot loading and watch changes live without reloading page
    // but devServer only hot reload js files and not html changes
    // to hot reload html you can always use vsc live server
    devServer:{
        // if you specify dist directory below, the index.html file should be in that dist directory
        
        contentBase: path.join(__dirname, 'dist'),

        // or if index.html is at root
        // contentBase: path.join(__dirname, '/'),
        // or server from multiple locations
        // contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],

        port: 3000,
        
        // enable gzip compression
        compress: true,

        // https: true,
        
        // Open the browser after server had been started
        open: true,
        // Specify a page to navigate to when opening the browser
        // openPage: '/different/page.html'

        // The bundled files will be available in the browser under this path
        // publicPath: '/assets/',
        // or
        // publicPath: 'http://localhost:3000/assets/'

        watchContentBase: true
    },
    plugins:[
        
        // for Tree Shaking
        new BundleAnalyzerPlugin()

    ],
    module: {
        rules: [
            {
                // Add Side Effects with tree shaking // Prevent BundleAnalyzerPlugin to remove unused parts of libraries
                // if a function from library is being used, whole library will be included in output
                // below line means that all included javascript files have side effects
                test: /\.js$/,
                sideEffects: true
            },
            {
                test: /\.css$/,
                // webpack processes files from right to left
                // first css-loader will be used and then style loader on all css files
                
                // but css-loader throws style in style tag in head section so we won't use css-loader
                
                // use: ["style-loader","css-loader"]

                // we will use file-loader with style-loader
                // use: ["style-loader/url","file-loader"]

                // but above will throw css file with random name so we will not use above either

                use: [
                        { loader: "style-loader/url" },
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]"
                            }
                        }   
                    ]

            },
            {
                test: /\.scss$/,
                // multiple files check/process
                // test: /\.(scss|sass)$/,
                
                /*
                use: [
                        // will be read by compiler from right to left
                        // first sass-loader, then css-loader and then style-loader
                        "style-loader", "css-loader", "sass-loader"
                    ]
                */    
                    // but above code throws css in html sstyle tag in head section
                    // so we will change it
                
                    use: [
                    { loader: "style-loader/url" },
                    {
                        loader: "file-loader",
                        options: {
                            //name: "[name].[ext]"
                            name: "app.css"
                        }
                    },
                    { loader: "sass-loader" }
                ]    

            },
            {
                // add babel-loader support // transpiling
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

}