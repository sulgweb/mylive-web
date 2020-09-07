/*
 * @description: 
 * @author: 小羽
 * @lastEditors: 小羽
 * @Date: 2020-08-31 15:49:05
 * @LastEditTime: 2020-09-05 16:38:24
 * @Copyright: 1.0.0
 */
import axios from 'axios'; // 引入axios
import Qs from 'qs'; // 引入qs模块，用来序列化post类型的数据
let myAxios = axios.create({})
myAxios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
myAxios.interceptors.request.use(async config => {
        /* const token = await getSync("token").then(res=>{
            return res.token
        }) */ 
        let token = localStorage.getItem("living_token")
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = decodeURI(token)  //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
myAxios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        //console.log("response.data", response.data)
        if (response.data.code) {
            switch (response.data.code) {
                case 1002:
                    store.state.isLogin = false
                    router.replace({
                    path: 'login',
                    query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error) // 返回接口返回的错误信息
    }
)

export default myAxios