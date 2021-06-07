<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2020-01-28 21:33:07
 * @LastEditTime: 2021-06-07 21:34:06
 * @Copyright: 1.0.0
-->
<template>
  <div class="barrage">
    <h3>弹幕列表</h3>
    <div class="live-line"></div>
    <section class="barrage-body" id="barrageList" ref="barrageList">
      <div
        v-for="(battage, battageIndex) in barrageMsgList"
        :key="battageIndex"
      >
        {{ battage.user }}:{{ battage.msg }}
      </div>
    </section>
    <div class="live-line"></div>
    <section class="barrage-msg">
      <Input
        v-model="battageMsg"
        maxlength="20"
        show-word-limit
        placeholder="请输入弹幕"
        style="width: 200px"
        @on-enter="chatLiveRoom"
      />
      <Button
        type="primary"
        style="margin-left: 20px; width: 80px"
        @click="chatLiveRoom"
        >发送</Button
      >
    </section>
  </div>
</template>
<script>
//import {sock,socket} from "@/assets/api/socket.js"
import { common } from "@/assets/js/common.js";
import bus from "@/assets/js/bus.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      battageMsg: "",
      livingRoom: "",
    };
  },
  computed: {
    ...mapState({
      barrageMsgList: (state) => state.barrage.barrageMsgList,
      currentUser: (state) => state.user.currentUser,
    }),
  },
  mounted() {
    this.livingRoom = common.getUrlParam("room");
    console.log(this.livingRoom);
    this.joinLiveRoom(this.livingRoom);
    this.$socketBarrage.on("chatLiveRoom", (res) => {
      this.pushbarrageMsgList(res);
      this.$nextTick(() => {
        this.$refs.barrageList.scrollTop = this.$refs.barrageList.clientHeight;
      });
    });
  },

  beforeDestroy() {
    this.leaveLiveRoom(this.livingRoom);
  },
  methods: {
    ...mapMutations(["pushbarrageMsgList"]),

    //加入直播间
    joinLiveRoom(name) {
      this.$sockBarrage.joinRoom(name);
    },

    //离开直播间
    leaveLiveRoom(name) {
      console.log(name);
      this.$sockBarrage.leaveRoom(name);
    },

    //发送弹幕
    chatLiveRoom() {
      console.log(this.currentUser);
      if (!this.currentUser.id) {
        this.$Message.error("请登录后再发言~");
      } else if (this.battageMsg) {
        let data = {
          room: this.livingRoom,
          func: "chatLiveRoom",
          data: {
            user: this.currentUser.name,
            msg: this.battageMsg,
          },
        };
        this.$sockBarrage.roomChat(data);
        this.battageMsg = "";
      } else {
        this.$Message.error("请输入弹幕内容！");
      }
    },
  },
};
</script>

<style lang="less">
.barrage {
  height: 100%;
  h3 {
    padding: 0 10px;
  }
  &-body {
    height: calc(100% - 60px);
    overflow-y: auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
  &-msg {
    margin-top: 10px;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
