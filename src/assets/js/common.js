/*
 * @description: 公共方法
 * @author: 小羽
 * @lastEditors: 小羽
 * @Date: 2020-09-07 15:24:07
 * @LastEditTime: 2020-11-23 00:15:19
 * @Copyright: 1.0.0
 */

class Common{
    //生成len位随机字符串
    getCode(len){
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var nums = "";
        for (var i = 0; i < len; i++) {
        var id = parseInt(Math.random() * 62);
        nums += chars[id];
        }
        return nums;
    }

    //获取url中的单个数据
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return decodeURI(r[2]); return null;
    }

    //获取url中的所有数据
    getUrlParams(){
        let url = window.location.search;  //url中?之后的部分
        console.log(window.location)
        url = url.substring(1);    //去掉?
        let dataObj = {};
        if(url.indexOf('&')>-1){
            url = url.split('&');
            for(let i=0; i<url.length; i++){
                let arr = url[i].split('=');
                dataObj[arr[0]] = arr[1];
            }
        }else{
            url = url.split('=');
            dataObj[url[0]]= url[1];
        }
        return dataObj;
    }

    //队列
    myQueue(){
        let items = []
        this.list = ()=>{
            return items
        }
        //向队列的尾部添加元素
        this.enqueue = (ele)=>{
            items.push(ele)
        }
        //从队列的头部移除元素
        this.dequeue = (ele)=>{
            items.shift()
        }
        //返回队列最前面的项
        this.front = ()=>{
            return items[0]
        }
        //返回队列最后一项
        this.end = ()=>{
            return items[items.length-1]
        }
        //返回队列是否为空
        this.isEmpty = ()=>{
            return items.length === 0
        }
        //返回队列的长度
        this.size = () =>{
            return items.length
        }
        //打印队列
        this.print = () =>{
            console.log(items.toString())
        }
    }
}


// // 防抖 (只执行最后一次点击)
// export const Debounce = (fn, t) => {
//     let delay = t || 500;
//     let timer;
//     return function () {
//         let args = arguments;
//         if(timer){
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             timer = null;
//             fn.apply(this, args);
//         }, delay);
//     }
// };

// //节流(先执行一次，过了t/1000秒后，有操作再执行执行第二次))
// export const Throttle = (fn, t) => {
//     let last;
//     let timer;
//     let interval = t || 500;
//     return function () {
//         let args = arguments;
//         let now = +new Date();
//         if (last && now - last < interval) {
//             clearTimeout(timer);
//             timer = setTimeout(() => {
//                 last = now;
//                 fn.apply(this, args);
//             }, interval);
//         } else {
//             last = now;
//             fn.apply(this, args);
//         }
//     }
// };

const common = new Common();
export {common}