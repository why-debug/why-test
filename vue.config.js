module.exports = {
    publicPath: './',
    devServer: {
        port: 8022,     // 端口
        open: true,
        proxy: 'http://211.137.107.18:8888'
    }
};
