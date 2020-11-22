<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2020-01-16 23:02:22
 * @LastEditTime: 2020-11-23 00:43:50
 * @Copyright: 1.0.0
-->
<template>
  <div class="room">
    <section class="video-content">
      <div class="video-content-header">
        <div class="video-content-header-avatar">
          <img :src="roomDetail.avatar" />
        </div>
        <div>
          <div class="video-content-header-title">{{roomDetail.title}}</div>
          <div class="video-content-header-anchor">{{roomDetail.name}}</div>
        </div>
      </div>
      <div class="video-content-main">
        <div class="barrage-block" :style="{top:'40px'}">
          <span class="barrage-block-item" v-for="(item,index) of barrageMsgList" :key="index+item">{{item.msg}}</span>
        </div>
        <video id="videoElement" width="100%" height="100%" controls></video>
      </div>
    </section>
    <section class="chat-content">
      <Barrage></Barrage>
    </section>
  </div>
</template>
<script>
//const flyjs = require("../../assets/js/flv");
import flvjs from "flv.js";
import { common } from "@/assets/js/common.js";
import Barrage from "./barrage.vue";
import {mapState,mapMutations} from "vuex"

export default {
  data() {
    return {
      roomDetail: {},
    };
  },
  components: {
    Barrage,
  },
  computed:{
    ...mapState({
      barrageMsgList:state=>state.barrage.barrageMsgList
    })
  },
  created() {},
  async mounted() {
    let urlData = this.$router.history.current.query;
    this.livingRoom = urlData.room;
    this.roomDetail = await this.$api.livingRoomApi.getRoomDetail({id:this.livingRoom})
    this.$nextTick(() => {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: `${this.$baseEnv.livingUrl}/${this.livingRoom}.flv`,
        });
        this.flvPlayer.attachMediaElement(videoElement);
        try {
          this.flvPlayer.load();
          this.flvPlayer.play();
        } catch {
          console.log("error");
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.room {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 44vw;
  .video-content {
    box-sizing: border-box;
    height: 100%;
    width: calc(100vw - 360px - 40px);
    min-width: 300px;
    padding: 20px;
    background: #fff;
    position: relative;
    &-header {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      &-avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        font-size: 20px;
      }
      &-anchor {
        color: #999;
      }
    }
    &-main {
      position: relative;
      height: calc(100% - 60px);
    }
    .barrage-block {
      z-index: 1;
      position: absolute;
      height: 40px;
      //border-bottom: #fff 1px solid;
      width: calc(100% - 40px);
      color: #fff;
      &-item {
        position: absolute;
        animation: barrage 5s linear;
        animation-fill-mode: forwards;
      }
    }
    video {
      object-fit: fill;
    }
  }
  .chat-content {
    width: 360px;
    height: 100%;
    background: #fff;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 20px 0;
  }
}

@keyframes barrage {
  from {
    left: 100%;
    transform: translateX(0);
  }
  to {
    left: 0;
    transform: translateX(-200%);
  }
}
</style>