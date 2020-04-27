module.exports = {

    devServer:{
        proxy:{
            '/api':{
                target:'www.tanghongtao.com',
                //ws:true,
                changeOrigin:true
            }
        }
    }
}