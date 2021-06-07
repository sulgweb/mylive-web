<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/sulgweb
 * @lastEditors: 小羽
 * @Date: 2020-01-16 23:03:11
 * @LastEditTime: 2020-09-18 01:04:39
 * @Copyright: 1.0.0
-->
<template>
  <div class="home">
    <div class="type-list">
      <div class="type-list-box">
        <div class="type-list-box-title">
          <Icon type="md-desktop" class="type-list-box-title-icon" />网游电竞
        </div>
        <section class="type-list-box-tap-list">
          <div
            class="type-list-box-tap-item"
            v-for="(item, index) of roomType.online"
            :key="index + item"
            @click="searchType(item)"
          >
            {{ item }}
          </div>
        </section>
      </div>
      <div class="type-list-box">
        <div class="type-list-box-title">
          <Icon
            type="md-game-controller-b"
            class="type-list-box-title-icon"
          />单机热游
        </div>
        <section class="type-list-box-tap-list">
          <div
            class="type-list-box-tap-item"
            v-for="(item, index) of roomType.offline"
            :key="index + item"
            @click="searchType(item)"
          >
            {{ item }}
          </div>
        </section>
      </div>
      <div class="type-list-box">
        <div class="type-list-box-title">
          <Icon
            type="md-phone-landscape"
            class="type-list-box-title-icon"
          />手游休闲
        </div>
        <section class="type-list-box-tap-list">
          <div
            class="type-list-box-tap-item"
            v-for="(item, index) of roomType.mobile"
            :key="index + item"
            @click="searchType(item)"
          >
            {{ item }}
          </div>
        </section>
      </div>
    </div>
    <div class="room-list">
      <div
        class="room-box"
        v-for="(item, index) in roomList"
        :key="'room-' + index"
        @click="goLivingRoom(item.id)"
      >
        <div class="room-box-img">
          <img :src="item.image" />
          <div class="room-box-img-type">{{ item.type }}</div>
        </div>
        <div class="room-box-title">{{ item.title }}</div>
        <!-- <div class="live-line"></div> -->
        <div class="room-box-user">
          <img :src="item.avatar" />
          <div class="room-box-user-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
  name: "roomList",
  data() {
    return {
      roomType: {
        online: [
          "英雄联盟",
          "云顶之弈",
          "穿越火线",
          "DNF",
          "Valorant",
          "炉石传说",
          "DOTA2",
          "坦克世界",
          "CSGO",
          "COD",
          "问道",
          "魔兽争霸",
        ],
        offline: [
          "绝地求生",
          "主机游戏",
          "我的世界",
          "方舟",
          "糖豆人",
          "怀旧游戏",
          "盗贼之海",
          "拾遗记",
        ],
        mobile: ["王者荣耀", "和平精英"],
      },
    };
  },
  computed: {
    ...mapState({
      roomList: (state) => state.room.roomList,
    }),
  },
  mounted() {
    //this.getRoomList()
    this.searchType();
  },
  methods: {
    ...mapActions(["setRoomList"]),

    /**
     * @description: 跳转到直播间
     * @Date: 2020-09-03 01:08:26
     * @author: 小羽
     * @param {type}
     * @return {type}
     */
    goLivingRoom(room_id) {
      //window.open(`${window.location.origin}/live?room=${room_id}`,"_blank")
      this.$router.push({ path: `/room?room=${room_id}` });
    },

    /**
     * @description: 根据类型搜索直播间
     * @Date: 2020-09-03 01:09:09
     * @author: 小羽
     * @param {type}
     * @return {type}
     */
    async searchType(data) {
      let params = {};
      if (data) {
        params.type = data;
      }
      this.setRoomList(params);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  justify-content: flex-start;
}
.type-list {
  background: #2f3035;
  height: calc(100vh - 60px);
  width: 250px;
  min-width: 250px;
  color: #8d919a;
  padding-top: 10px;
  &-box {
    &-title {
      font-size: 20px;
      &-icon {
        margin-left: 5px;
        margin-right: 10px;
      }
    }
    &-tap {
      &-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin: 10px;
      }
      &-item {
        font-size: 14px;
        text-align: center;
        background: #38393e;
        padding: 3px 8px;
        margin: 2px;
        width: 72px;
        overflow-x: hidden;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
}
.room-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  .room-box {
    display: inline-block;
    width: 300px;
    height: 280px;
    background: #fff;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    overflow: hidden;
    &-img {
      height: 200px;
      box-sizing: border-box;
      background: #eee;
      position: relative;
      &-type {
        position: absolute;
        right: 10px;
        top: 5px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 2px 8px;
      }
      img {
        width: 100%;
      }
    }
    &-title {
      margin: 5px 10px;
      &:hover {
        color: @primary-color;
      }
    }
    &-user {
      margin: 5px 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 0.5px solid #ccc;
        margin-right: 5px;
      }
    }
    &:hover {
      box-shadow: 0 0 8px #bbb;
    }
  }
}
</style>