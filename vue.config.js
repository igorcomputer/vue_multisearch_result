
let publicPath = 'app_multisearch/app_search';

module.exports = {
    publicPath: '/',
    chainWebpack: config => {
        config.module.rule('images').use('url-loader')
            .loader('file-loader') // replaces the url-loader
            .tap(options => Object.assign(options, {
                name: publicPath + '/img/[name].[hash:8].[ext]'
            }))
        config.module.rule('svg').use('file-loader')
            .tap(options => Object.assign(options, {
                name: publicPath + '/img/[name].[hash:8].[ext]'
            }))
    },
    css: {
        extract: {
            filename: publicPath + '/css/[name].[hash:8].css',
            chunkFilename: publicPath + '/css/[name].[hash:8].css'
        }
    },
    configureWebpack: {
        output: {
            filename: publicPath + '/js/[name].[hash:8].js',
            chunkFilename: publicPath + '/js/[name].[hash:8].js'
        }
    }
}

/*
module.exports = {
    publicPath: '/',
    filenameHashing: true,
    //outputDir: 'dist2222',
    //assetsDir: 'assets_dir'
}
*/