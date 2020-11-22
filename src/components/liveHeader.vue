<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2020-08-31 01:26:26
 * @LastEditTime: 2020-11-23 00:19:50
 * @Copyright: 1.0.0
-->
<template>
    <div class="live-header">
        <div class="live-header-logo" @click="gotoIndex">
            <img src="@/assets/images/logo.png"/>
        </div>
        <div class="live-header-center">
            <div class="live-header-center-list">
                <div class="live-header-center-item">直播</div>
                <div class="live-header-center-item">分类</div>
                <div class="live-header-center-item">赛事</div>
                <div class="live-header-center-item">视频</div>
            </div>
            <Input placeholder="输入相关的直播信息" v-model="searchInfo" />
            <Button type="primary" style="margin-left:20px" @click="setRoomList({keyword:searchInfo})">搜索</Button>
        </div>
        <div class="live-header-right">
            <Dropdown v-if="currentUser.id">
                <section class="live-header-right-user">
                    <div class="live-header-right-user-avatar">
                        <img :src="currentUser.avatar"/>
                    </div>
                    <div class="live-header-right-user-name">
                        <div>{{currentUser.name}}</div>
                    </div>
                </section>
                <DropdownMenu slot="list">
                    <DropdownItem>
                        <div @click="userLogout">退出登录</div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <section class="live-header-right-user" v-else>
                <div class="live-header-right-user-loginbtn" @click="loginPopupShow=true">登录/注册</div>
            </section>
        </div>
        <section>
            <Modal v-model="loginPopupShow" width="350px" :mask-closable="false" :footer-hide="true" :transfer="false">
                <Tabs>
                    <TabPane label="登录">
                        <Input name="account" style="margin:10px 0" prefix="ios-contact" placeholder="请输入账号" type="text" v-model="loginData.account" />
                        <Input name="password" style="margin:10px 0" prefix="ios-contact" placeholder="请输入密码" type="password" v-model="loginData.password"/>
                        <div align="right" style="margin-top:30px">
                            <Button type="primary" @click="userLogin">登录</Button>
                        </div>
                    </TabPane>
                    <TabPane label="注册">
                        <Form ref="registerData" :model="registerData" :rules="ruleRegistValidate" :label-width="60">
                            <FormItem label="昵称" prop="name">
                                <Input v-model="registerData.name" placeholder="请输入昵称" />
                            </FormItem>
                            <FormItem label="邮箱" prop="email">
                                <Input v-model="registerData.email" placeholder="请输入邮箱" />
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input v-model="registerData.password" type="password" placeholder="请输入密码" />
                            </FormItem>
                        </Form>
                        <div align="right">
                            <Button type="primary" @click="userRegister('registerData')">注册</Button>
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </section>
    </div>
</template>
<script>
import {mapActions,mapMutations,mapGetters,mapState} from "vuex"
export default {
    name:"liveHeader",
    data(){
        return {
            searchInfo:"",
            loginData:{
                account:"",
                password:"",
            },
            registerData:{
                name:"",
                email:"",
                password:""
            },
            ruleRegistValidate:{
                name: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6,max:20, message: '密码长度为6~20', trigger: 'blur' }
                ],
            },
            loginPopupShow:false,
        }
    },
    computed:{
        ...mapState({
            currentUser:state=>state.user.currentUser,
            token:state=>state.user.token
        })
    },
    mounted(){
    },
    created(){
        this.getUserInfo()
    },
    methods:{
        ...mapActions([
            "setRoomList"
        ]),
        ...mapMutations(["updateRoomList","updateCurrentUser","updateToken"]),

        /**
         * @description: 跳转到主页
         * @Date: 2020-09-03 00:45:46
         * @author: 小羽
         * @param {type} 
         * @return {type} 
         */
        gotoIndex(){
            this.$router.push({path:"/index"})
        },
        /**
         * @description: 获取用户信息
         * @Date: 2020-09-03 10:12:00
         * @author: XianPengFei
         * @param {type} 
         * @return {type} 
         */
        getUserInfo(){
            this.$api.userApi.getUserInfo().then(async res=>{
                await this.updateCurrentUser(res.data)
                this.loginPopupShow=false
                this.$Message.success({
                    background: false,
                    content: '登录成功'
                });
                console.log(this.currentUser)
            })
        },
        /**
         * @description: 用户登录
         * @Date: 2020-09-03 10:22:37
         * @author: XianPengFei
         * @param {type} 
         * @return {type} 
         */
        async userLogin(){
            console.log("userLogin -> this.loginData", this.loginData)
            await this.$api.userApi.userLogin(this.loginData).then(res=>{
                if(res.code===200){
                    let token = res.data
                    localStorage.setItem("living_token",token)
                    this.updateToken()
                }
            })
            this.getUserInfo()
        },
        /**
         * @description: 退出登录
         * @Date: 2020-09-03 11:23:58
         * @author: XianPengFei
         * @param {type} 
         * @return {type} 
         */
        userLogout(){
            localStorage.setItem("living_token","")
            this.updateToken()
            this.updateCurrentUser({})
            this.$Message.error({
                background: false,
                content: '退出登录'
            });
        },

        /**
         * @description: 用户注册
         * @Date: 2020-09-10 23:33:17
         * @author: 小羽
         * @param {type} 
         * @return {type} 
         */
        userRegister(name){
            console.log("userRegister -> this.$refs[name]", this.$refs[name])
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //this.$Message.success('Success!');
                    let data = {
                        ...this.registerData,
                        age:18
                    }
                    this.$api.userApi.addUser(data).then(res=>{
                        console.log("userRegister -> res", res)
                        this.$Message.success("注册成功")
                    }).catch(err=>{
                        this.$Message.error("注册失败")
                    })
                } else {
                    this.$Message.error('验证失败!');
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
    .live-header{
        background: #ffffff;
        min-height: 60px;
        //margin-bottom:10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        box-sizing: border-box;
        position: relative;
        -webkit-app-region: drag;
        &-logo{
            font-size:32px;
            color: @primary-color;
            cursor: pointer;
            display: flex;
            align-items: center;
            -webkit-app-region: no-drag;
            img{
                height: 60px;
                width: 70px;
            }
        }
        &-center{
            color:#666;
            margin-left: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-app-region: no-drag;
            &-list{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &-item{
                margin:10px;
                min-width: 40px;
                cursor: pointer;
                &:hover{
                    color: @primary-color;
                }
            }  
        }
        &-right{
            margin-left: 20px;
            display: flex;
            color: #666;
            -webkit-app-region: no-drag;
            &-user{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;
                &-avatar{
                    display: flex;
                    align-items: center;
                    img{
                        height: 26px;
                        width: 26px;
                        border-radius: 50%;
                    }
                }
                &-name{
                    margin-left: 10px;
                    width: 70px;
                    overflow: hidden;
                }
                &-loginbtn{
                    width: 100px;
                    cursor: pointer;
                    &:hover{
                        color: @primary-color;
                    }
                }
            }
        }
        &-window{
            z-index: 999999;
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            justify-content: flex-end;
            -webkit-app-region: no-drag;
            &-minibtn{
                text-align: center;
                line-height: 20px;
                width: 30px;
                height: 20px;
                &:hover{
                    background: #eeeeee;
                }
            }
            &-maxbtn{
                text-align:center;
                line-height: 20px;
                width:30px;
                height: 20px;
                &:hover{
                    background: #eeeeee;
                }
            }
            &-closebtn{
                text-align: center;
                line-height: 20px;
                width:30px;
                height: 20px;
                &:hover{
                    color: #fff;
                    background: #f00;
                }
            }
        }
    }
</style>