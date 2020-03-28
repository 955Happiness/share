<template>
  <div id="app" ref="app">
    <div class="head">
      <div class="logo lightSpeedIn">Vue In Action</div>
      <ul class="nav unstyle inline">
        <router-link class="nav-item" tag="li" to="/" exact>导航一</router-link>
        <router-link class="nav-item" tag="li" to="/new">导航二</router-link>
      </ul>
      <ul class="menu unstyle inline">
        <li class="menu-item">
          <!-- <el-color-picker v-model="themeColor" show-alpha size='mini' @active-change="themeChange"></el-color-picker> -->
          <el-tooltip content="主题更换" placement="left" effect="light">
            <i class="el-icon-menu" @click="themeVisible = !themeVisible"></i>
          </el-tooltip>

          <transition enter-active-class="bounceIn" leave-active-class="flipOutX">
            <div class="colorTheme" v-show="themeVisible">
              <div
                v-for="(item,label) in themeData"
                :key="label"
                class="themeIcon"
                :style="{'backgroundColor':item}"
                @click="themeChange(label)"
              ></div>
            </div>
          </transition>
        </li>
        <li class="menu-item">
          <i class="el-icon-paperclip"></i>
        </li>
        <li class="menu-item">
          <i class="el-icon-user"></i>
        </li>
      </ul>
    </div>
    <div class="main">
      <transition leave-active-class="bounceOutDown" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      themeVisible: false,
      activeIndex: 1,
    };
  },
  computed: {
    themeData() {
      return this.$store.state.themeData;
    },
    isLogin(){
      return this.$store.state.isLogin;
    }
  },
  methods: {
    tabChange(index) {
      this.activeIndex = index;
      if (index == 1) {
        this.$router.replace("/");
      } else {
        this.$router.replace("/newStandard");
      }
    },

    themeChange(theme) {
      this.$store.commit("setTheme", theme);
      this.themeVisible = false;
    }
  },
  mounted() {
    let theme = this.$store.state.theme;
    this.$store.commit("setTheme", theme);
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  // padding-top: $navbar-height;
  overflow-x: hidden;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .head {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
    box-shadow: 0 -2px 6px 0px inset $shadow-color;
    // background: $white-color;
    // height: $navbar-height;
    // line-height: $navbar-height;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      padding: 0 15px;
      letter-spacing: 0.4em;
      font-size: 150%;
      // line-height: $navbar-height;
    }
    .nav {
      flex-grow: 1;
      .nav-item {
        cursor: pointer;
        padding: 0 10px;
        position: relative;
        letter-spacing: 0.2em;

        &.router-link-active {
          // color: $primary-color;
        }
        &::after {
          content: "";
          display: inline-block;
          height: 2px;
          width: 0px;
          position: absolute;
          bottom: 10px;
          left: 50%;
          // background-color: $primary-color;
          transition: all linear 0.3s;
          opacity: 0;
        }
        &.router-link-active::after {
          width: 20px;
          margin-left: -10px;
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
    .menu {
      padding: 0 30px 0 0;
      & > .menu-item {
        font-size: 120%;
        cursor: pointer;
        position: relative;
        & {
          margin-left: 30px;
        }
        .colorTheme {
          position: absolute;
          left: 0;
          top: 100%;
          width: 120px;
          text-align: center;
          padding: 6px;
          // background: $white-color;

          &::after {
            content: "";
            clear: both;
          }
          .themeIcon {
            float: left;
            width: 20px;
            height: 20px;
            margin: 6px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .main {
    height: 100%;
  }
}
</style>
