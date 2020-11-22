/*
 * @description: 
 * @author: 小羽
 * @lastEditors: 小羽
 * @Date: 2020-09-01 13:43:51
 * @LastEditTime: 2020-10-15 01:16:59
 * @Copyright: 1.0.0
 */
const state = {
    currentUser:{},
    token:""
}
const actions = {}
const mutations = {
    updateCurrentUser(state,data){
        state.currentUser = data
    },
    updateToken(state){
        state.token = localStorage.getItem("living_token")
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}