import Vue from 'vue'
import App from './App.vue'

//引入iview
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

Vue.config.productionTip = false

//将baseEnv注入到vue原型中
import baseEnv from "@/assets/js/env.js"
Vue.prototype.$baseEnv = baseEnv;

//将common注入到vue原型中
import {common} from "@/assets/js/common.js"
Vue.prototype.$commonFunc = common

new Vue({
  render: h => h(App),
}).$mount('#app')
