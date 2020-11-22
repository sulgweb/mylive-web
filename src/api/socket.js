/*
 * @Description: 
 * @Author: 小羽
 * @LastEditors: 小羽
 * @Date: 2020-11-22 23:08:08
 * @LastEditTime: 2020-11-22 23:17:10
 */
 
import baseEnv from "@/assets/js/config.js"
const socketBarrage = require('socket.io-client')(baseEnv.socketUrl.barrage);
console.log("socketBarrage", socketBarrage)
console.log("baseEnv", baseEnv)
console.log("baseEnv.socketUrl.barrage", baseEnv.socketUrl.barrage)

class SockBarrage {
    //加入房间
    joinRoom(name){
        socketBarrage.emit('JOINROOM', name);
    }

    //离开房间
    leaveRoom(name){
        socketBarrage.emit('LEAVEROOM', name);
    }

    //房间内发送消息
    roomChat(data){
        socketBarrage.emit("ROOMCHAT",data)
    }
}

const sockBarrage = new SockBarrage();
export {sockBarrage,socketBarrage}
