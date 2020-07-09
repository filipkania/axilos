const { spawn } = require('child_process');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rimraf = require('rimraf');

let proc;

module.exports = [
    {
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
        entry: {
            main: './src/App.tsx',
            electron: './src/electron/index.ts'
        },
        target: 'electron-main',
        devtool: 'source-map',
        cache: false,
        node: {
            __dirname: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: [
                        /node_modules/
                    ],
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(tsx|ts)?$/,
                    use: 'ts-loader',
                    exclude: [
                        /node_modules/
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|jp2|webp|woff2|ttf)$/,
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        publicPath: url => url
                    },
                },
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            contentBasePublicPath: '/',
            historyApiFallback: true,
            compress: true,
            writeToDisk: true,
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
                    'public/',
                ]
            }),
            {
                apply: c => 
                    c.hooks.afterEmit.tap("restart_electron", (comp) => {
                        if (process.env.DISABLE_RELOADING_ELECTRON) return;
                        if (proc)
                            proc.kill();

                        if (comp.errors.length === 0)
                            proc = spawn('npm', ['run', 'dev:electron_start'], {
                                shell: true,
                                stdio: "inherit"
                            });
                    })
            },
            {
                apply: c => 
                    c.hooks.beforeCompile.tapAsync("restart_electron", (_, cb) => {
                        console.log(`Removing old build folder: ${path.join(__dirname, 'build/')}`);
                        rimraf(path.join(__dirname, 'build/'), cb);
                    })
            }
        ],
    }
];