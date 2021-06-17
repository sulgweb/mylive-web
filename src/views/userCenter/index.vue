<!--
 * @Description: 个人中心
 * @Author: 小羽
 * @LastEditors: 小羽
 * @Date: 2021-06-11 21:33:59
 * @LastEditTime: 2021-06-18 07:49:29
-->

<template>
  <div
    class="user"
    :style="{ marginTop: $route.meta.noHeader ? '0px' : '60px' }"
  >
    <div class="user-center">
      <!-- {{ currentUser }} -->
      <div class="user-center-header">
        <img :src="currentUser.avatar" />
      </div>
      <div class="user-center-info">
        <div>
          <span class="user-center-info-title">昵称</span>
          <span class="user-center-info-text">{{currentUser.name}}</span>
        </div>
        <div>
          <span class="user-center-info-title">年龄</span>
          <span class="user-center-info-text">{{currentUser.age}}</span>
        </div>
        <div>
          <span class="user-center-info-title">邮箱</span>
          <span class="user-center-info-text">{{currentUser.email}}</span>
        </div>
        <!-- <div>
          <span class="user-center-info-title">直播间</span>
          <span class="user-center-info-text">{{currentUser.name}}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userCenter",
  computed: {
    ...mapState({
      currentUser: (state) => state.user.currentUser,
    }),
  },
  data() {
    return {};
  },
  watch:{
    'currentUser.id':{
      handler(newval,oldval){
        console.log(newval,oldval)
      },
      immediate:true
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  justify-content: center;

  &-center {
    width: 768px;
    overflow: hidden;
    background: #fff;
    min-height: 100vh;
    padding: 10px;
    display: flex;
    

    &-header {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid #ccc;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &-info {
      width: calc(~'100% - 200px');
      box-sizing: border-box;
      padding-left: 20px;
      &-title{
        margin-right: 10px;
        color: #aaa;
      }
      &-text{
        font-size: 20px;
        color: #666;
      }
    }
  }
}
</style>