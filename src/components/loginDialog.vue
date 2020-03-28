<template>
  <el-dialog class="loginDialog" :visible.sync="visible" width="40%" :before-close="cancel" append-to-body :close-on-click-modal="false">
        <div class="text-center" style="font-size:80%;">您还未登录哦!</div>
        <div class="text-center">
            <ul class="unstyle inline login">
                <li :class="{'login-item':true, active:loginCategory == 'password'}" @click="loginCategoryChange('password')">账号密码登录</li>
                <li :class="{'login-item':true, active:loginCategory == 'mailCode'}" @click="loginCategoryChange('mailCode')">验证码登录</li>
            </ul>
        </div>
        <div class="login-content">
            <!-- enter-active-class="bounceInDown" leave-active-class="fadeOut" -->
            <transition mode="out-in">
                <el-form class="login-content-item" v-model="userForm" label-width="80px" v-if="loginCategory=='password'" :key="1">
                    <div>
                        <el-form-item label="用户名:" prop="name">
                            <el-input v-model="userForm.name" size="small"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="密  码:" prop="password">
                            <el-input v-model="userForm.password" size="small"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="" prop="isRemember">
                            <el-checkbox v-model="userForm.isRemember">记住我</el-checkbox>
                        </el-form-item>
                    </div>
                </el-form>
                <!-- divide -->
                <el-form class="login-content-item" v-model="mailForm" label-width="80px" v-else  :key="2">
                    <el-form-item label="手机号:" prop="tel">
                        <el-input v-model="mailForm.tel" size="small"></el-input>
                    </el-form-item>
                    <el-row :gutter="6">
                        <el-col :span="20">
                            <el-form-item label="验证码:" prop="mailCode">
                                <el-input v-model="mailForm.mailCode" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="" label-width="0px">
                                <el-button @click="sendMail" size="small">发送验证码</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </transition>
        </div>
        <div class="btn-group text-center">
            <el-button class="btn" type="primary" @click="login">登 录</el-button>
            <el-button class="btn" type="info" @click="cancel">取 消</el-button>
        </div>
  </el-dialog>
</template>

<script>
//登录框
//需要用户登录 授权访问
//$emit: refresh(刷新,跳转至下一个路由) | cancel(关闭登录对话框)
export default {
  name: "loginDialog",
  data() {
    return {
        loginCategory:'password', //password(用户/密码) | mailCode(验证码)
        userForm:{
            name:'',password:'',isRemember:false,
        },
        mailForm:{
            tel:'',mailCode:''
        },
    };
  },
  model: {
    prop: "visible",
    event: "visibleChange"
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("visibleChange", false);
      this.clear();
    },
    clear() {
        this.userForm = {
            name:'',password:'',isRemember:false
        };
        this.mailForm = {
            tel:'',mailCode:''
        }
        this.loginCategory='password';
    },
    loginCategoryChange(category = 'password'){
        this.loginCategory = category;
    },
    login(){
        //Todo
        this.$store.commit('setLogin',true);
        this.close();
        this.$emit('refresh');
    },
    sendMail(){
        //Todo
    },
    cancel(){
        this.close();
        this.$emit('cancel')
    }
  }
};
</script>

<style lang="scss" scoped>
.loginDialog{
    overflow: hidden;
    .login{
        height:40px;
        line-height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        >.login-item{
            margin: 0 16px;   
        }
    }
    .login-content{
        position: relative;
        min-height: 150px;
        overflow: hidden;
        margin-top: 15px;
        .login-content-item{
            position: absolute;
            left: 0;
            right: 0;
        }
    }
}
</style>