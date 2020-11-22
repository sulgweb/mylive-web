/*
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2020-09-03 00:52:35
 * @LastEditTime: 2020-09-18 00:53:45
 * @Copyright: 1.0.0
 */
import api from "@/api/index.js"
const state = {
    roomList:[]
}
const actions = {
    async setRoomList({commit},data){
        let res = await api.livingRoomApi.getRoomList(data)
        commit("updateRoomList",res)
    }
}
const mutations = {
    updateRoomList(state,data){
        state.roomList = data
    }
}
const getters = {}

export default {
    namespace:"livingRoom",
    state,
    actions,
    mutations,
    getters
}