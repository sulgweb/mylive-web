/*
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2019-10-09 21:55:04
 * @LastEditTime: 2020-09-07 15:31:10
 * @Copyright: 1.0.0
 */

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, "./src/assets/style/common.less")]
        })
}

module.exports = {
    //eslint开关
    lintOnSave: false,
    //生成环境是否生成map文件
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        //代理配置
        proxy: {
            '/webserve': {
                target: 'http://127.0.0.1:8512',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/webserve': ''
                }
            },
        },
    },
    chainWebpack: (config) => {
        //配置less
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },
}