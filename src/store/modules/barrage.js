/*
 * @description: 弹幕相关
 * @author: 小羽
 * @lastEditors: 小羽
 * @Date: 2020-09-01 13:43:51
 * @LastEditTime: 2021-06-07 23:28:03
 * @Copyright: 1.0.0
 */
import { common } from "@/assets/js/common.js"
const state = {
    barrageMsgList: [
        // {user:"用户1",msg:"6666"},
        // {user:"用户2",msg:"777"}
    ],
}
const actions = {}
const mutations = {
    pushbarrageMsgList(state, data) {
        state.barrageMsgList.push(data)
    },
    unshiftbarrageMsgList(state) {
        state.barrageMsgList.unshift()
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}