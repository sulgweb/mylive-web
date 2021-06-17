<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/sulgweb
 * @lastEditors: 小羽
 * @Date: 2019-10-09 21:41:17
 * @LastEditTime: 2021-06-11 22:11:07
 * @Copyright: 1.0.0
-->
<template>
  <div id="app">
    <live-header v-if="!$route.meta.noHeader"></live-header>
    <keep-alive>
      <!--使用keep-alive会将页面缓存-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { common } from "feather-common";
import liveHeader from "@/components/liveHeader";
export default {
  name: "app",
  components: {
    liveHeader,
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 720px;
}
</style>
