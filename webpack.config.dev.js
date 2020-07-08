const { spawn } = require('child_process');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let proc;

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        mainFields: ['main', 'module', 'browser'],
    },
    watchOptions: {
        ignored: [
            '/node_modules/'
        ]
    },
    entry: './src/index.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    cache: false,
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        contentBasePublicPath: '/',
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 3000,
        publicPath: '/',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/'
                }
            ]
        }),
        {
            apply: c => 
                c.hooks.afterEmit.tap("restart_electron", (comp) => {
                    if (proc)
                        proc.kill();

                    if (comp.errors.length === 0)
                        proc = spawn('npm', ['run', 'dev:electron_start'], {
                            shell: true,
                            stdio: "inherit"
                        });
                })
        }
    ],
};