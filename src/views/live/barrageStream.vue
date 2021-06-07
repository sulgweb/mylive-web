<!--
 * @Description: 
 * @Author: 小羽
 * @LastEditors: 小羽
 * @Date: 2021-06-07 21:53:30
 * @LastEditTime: 2021-06-07 23:58:35
-->
<template>
  <div class="barrage-stream" ref="barrageStream">
    <div
      class="barrage-block"
      v-for="(stream, streamIndex) of barrageStreamList"
      :key="'barrageStreamList' + streamIndex"
    >
      <div class="barrage-block-item" v-for="item of stream" :key="item.id">
        {{ item.msg }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "barrage",
  data() {
    return {
      barrageStreamRect: {},
      barrageStreamList: [],
      barrageStreamListNum: null,
    };
  },
  computed: {
    ...mapState({
      barrageMsgList: (state) => state.barrage.barrageMsgList,
    }),
  },
  methods: {
    ...mapMutations(["unshiftbarrageMsgList"]),
    // 获取弹幕轨道播放流的数量
    getBarrageStreamList() {
      console.log(this.$refs.barrageStream.getBoundingClientRect());
      this.barrageStreamRect = this.$refs.barrageStream.getBoundingClientRect();
      this.barrageStreamListNum = Math.floor(
        (this.barrageStreamRect.height - 100) / 36
      );
      this.barrageStreamList = [];
      for (let i = 0; i < this.barrageStreamListNum; i++) {
        this.barrageStreamList.push([]);
      }
      console.log(this.barrageStreamList);
    },
  },
  watch: {
    barrageMsgList: {
      handler(newval) {
        if (newval.length) {
          let randomNum = Math.floor(Math.random() * this.barrageStreamListNum);
          this.barrageStreamList[randomNum].push(newval[newval.length - 1]);
          setTimeout(() => {
            let shiftStr = this.barrageStreamList[randomNum].shift();
            console.log("this.barrageStreamList", shiftStr.msg);
          }, 5000);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getBarrageStreamList();
    window.addEventListener("resize", this.getBarrageStreamList);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getBarrageStreamList);
  },
};
</script>

<style lang="less" scoped>
.barrage-stream {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 9999;
  .barrage-block {
    z-index: 1;
    position: relative;
    height: 40px;
    //border-bottom: #fff 1px solid;
    width: 100%;
    color: #fff;
    &-item {
      position: absolute;
      display: inline-block;
      width: 200px;
      animation: barrage 5s linear;
      animation-fill-mode: forwards;
    }
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