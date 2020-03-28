<template>
  <div class="checkStandard--route">
    <transition enter-active-class="slideInLeft">
      <div class="banner" v-show="bannerAnimation">
        <div class="banners">
          <!-- 预取图片，避免切换动画空白 -->
          <img src="@/assets/images/banner1.jpg" style="width:0px;height:0px;visibility: hidden;">

          <transition enter-active-class="slideInLeft" leave-active-class="lightSpeedOut" mode="out-in">
              <img src="@/assets/images/banner.jpg" alt="" style="width:100%;height:100%;" v-show="bannerImageAnimation">
              <!-- <img src="@/assets/images/banner1.jpg" alt="" style="width:100%;height:100%;" v-show="!bannerImageAnimation"> -->
          </transition>
          <transition enter-active-class="fadeIn" leave-active-class="slideOutLeft" mode="out-in">
              <!-- <img src="@/assets/images/banner.jpg" alt="" style="width:100%;height:100%;" v-show="bannerImageAnimation"> -->
              <img src="@/assets/images/banner1.jpg" alt="" style="width:100%;height:100%;" v-show="!bannerImageAnimation">
          </transition>
        </div>
        <div class="banner-content">
          <div
            class="fieldContainer"
            :class="{'fieldContainer':true,'fixed':fixed}"
          >
            <el-input v-model="code" placeholder="请输入" class="textField" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <div class="fieldBtn">搜 索</div>
          </div>
          <el-link class="link lightSpeedIn" v-if="!isLogin&&!bannerAnimation" @click="login">已有账号？ 请登录</el-link>
          <el-link class="link lightSpeedIn" v-else-if="!isLogin&&!fixed" @click="login">已有账号？ 请登录</el-link>
        </div>
      </div>
    </transition>
    <div class="standardList bounceInUp">
      <div class="standardList-content">
        <el-table
          :data="result"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          style="height:600px;"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="编号" prop="code">
            <template slot-scope="{ row }">
              {{ row.code }} <i class="el-icon-paperclip status-success"></i>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name">
            <template slot-scope="{ row }">
              {{ row.name }}
            </template>
          </el-table-column>
          <el-table-column label="日期" prop="date">
            <template slot-scope="{ row }">
              {{ row.date }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="{ row }">
              <span class="status status-primary" v-if="row.status == 0">
                状态一
              </span>
              <span class="status status-primary" v-else-if="row.status == 1">
                状态二
              </span>
              <span class="status status-warning" v-else-if="row.status == 2">
                状态三
              </span>
              <span class="status status-danger" v-else-if="row.status == 3">
                状态四
              </span>
              <span class="status status-danger" v-else>
                状态五
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="text-center" background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    <div class="standard-footer">
        <div style="display:flex;justify-content:center;">
          <img src="@/assets/images/barcode.png"  width="200" height="200"/>
        </div>
        <p class="company-info">求打赏</p>
    </div>
    <loginDialog v-model="loginVisible"></loginDialog>
  </div>
</template>

<script>
//查标准
import { debounce } from 'throttle-debounce'
export default {
  name: "checkStandard",
  data() {
    return {
      bannerAnimation: false,
      code: "",
      result: [
        { code: "1212-2002", name: "名称", date: "2020-04-05", status: 0 },
        { code: "1212-2002", name: "名称", date: "2020-04-05", status: 1 },
        { code: "1212-2002", name: "名称", date: "2020-04-05", status: 2 },
        { code: "1212-2002", name: "名称", date: "2020-04-05", status: 3 },
        { code: "1212-2002", name: "名称", date: "2020-04-05", status: 4 },
      ],
      columns: [
        { label: "编号", prop: "code" },
        { label: "名称", prop: "name" },
        { label: "日期", prop: "date" },
        { label: "状态", prop: "status" },
      ],
      fixed: false,
      bannerImageAnimation: true,
      timer:null,
      loginVisible:false,
    };
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin;
    }
  },
  components:{
    loginDialog:() => import('@/components/loginDialog')
  },
  methods: {
    debounceWheelAction:debounce(300,function(){
      this.wheelAction()
    }),
    wheelAction() {
      let scrollTop = document.getElementById('app').scrollTop;
      if (scrollTop > 200) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
    login(){
      //Todo
      this.loginVisible = true;
    }
  },
  mounted() {
    this.bannerAnimation = true;
    window.addEventListener("wheel", this.debounceWheelAction);
    this.timer = setInterval(()=>{
      this.bannerImageAnimation = !this.bannerImageAnimation; 
    },10*1000)
  },
  beforeDestroy() {
    window.removeEventListener("wheel", this.debounceWheelAction);
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.checkStandard--route {
  .banner {
    height: 700px;
    // background-image: url("../assets/images/banner.jpg");
    // background-repeat: no-repeat;
    // background-size: 100%;
    position: relative;
    .banners{
      position:absolute;
      left: 0;
      right:0;
      top:0;
      bottom:0;
      z-index: -1;
      background: $shadow-color;
      img{
        position: absolute;
      }
    }
    .banner-content {
      width: 50%;
      margin: 0 auto 0;
      position: absolute;
      left: 25%;
      top: 50%;
      .fieldContainer {
        &.fixed {
          position: fixed;
          top: 10px;
          right: 200px;
          z-index: 100;
          width: 40%;
          & > .fieldBtn {
            display: none;
          }
        }

        display: flex;
        flex-direction: row;
        align-items: center;
        // border-radius: $radius/2;
        overflow: hidden;
        // background: $white-color;
        & > .textField {
          flex-grow: 1;
          .el-input__inner {
            border-radius: 0px !important;
          }
        }
        & > .fieldBtn {
          // color: $white-color;
          padding: 0 15px;
          width: 6em;
          text-align: center;
          height: 40px;
          line-height: 40px;
          letter-spacing: 0.2em;
          user-select: none;
          // background: $primary-color;
          cursor: pointer;
          &:active {
            opacity: 0.8;
          }
        }
      }
      .link {
        // color: $white-color;
        letter-spacing: 0.2em;
        margin: 10px 0 0 30px;
        padding: 0.2em 0;
        text-decoration: none;
        &::after {
          border-color: $white-color;
        }
      }
    }
  }
  .standardList {
    position: relative;
    width: 80%;
    // margin: -$navbar-height auto 0;

    // border-radius: $radius;
    box-sizing: border-box;
    margin-bottom: 4px;
    &-content {
      padding: 15px 30px 0;
      // background-color: $white-color;
      // box-shadow: 0px 0px 4px 2px $shadow-color;
    }
    th.is-leaf {
      // border-bottom: 2px solid $primary-color !important;
    }
  }
  .standard-footer {
    padding: 6px;
    background: rgb(51, 51, 51);
  }
  .status.status-primary::before{
    $width:8px;
    content:"";
    width:$width;
    height: $width;
    border-radius: 9999px;
    background: $primary-color;
  }
  .status.status-success::before{
    $width:8px;
    content:"";
    width:$width;
    height: $width;
    border-radius: 9999px;
    background: $success-color;
  }
  .status.status-warning::before{
    $width:8px;
    content:"";
    width:$width;
    height: $width;
    border-radius: 9999px;
    background: $warning-color;
  }
  .status.status-danger::before{
    $width:8px;
    content:"";
    width:$width;
    height: $width;
    border-radius: 9999px;
    background: $danger-color;
  }
}
</style>