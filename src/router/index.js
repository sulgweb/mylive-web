/*
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2019-10-09 21:59:23
 * @LastEditTime: 2020-09-12 12:16:29
 * @Copyright: 1.0.0
 */
import Vue from 'vue'
import Router from 'vue-router'
import baseEnv from "@/assets/js/config.js"
Vue.use(Router)

export default new Router({
    mode:baseEnv.mode==="electron"?"hash":"history",
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            path: '/index',
            name:"index",
            meta:{
                noHeader:false
            },
            component: () => import("@/views/home/roomList.vue"),
        },
        {
            path: "/room",
            name:"room",
            meta:{
                noHeader:false
            },
            component: () => import("@/views/live/room.vue")
        }
    ]
})