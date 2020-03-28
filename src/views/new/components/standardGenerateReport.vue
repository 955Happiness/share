<template>
  <el-dialog :visible.sync="visible" width="60%" :before-close="close" append-to-body :close-on-click-modal="false">
      <div class="btn-group text-right" style="margin:6px 0;padding-right:50px;">
          <el-button class="btn" type="primary">下载</el-button>
          <el-button class="btn" type="primary">发送</el-button>
          <el-button class="btn" type="info" @click="close">关闭</el-button>
      </div>
      <div class="spread" ref="spread" style="height:500px"></div>
  </el-dialog>
</template>

<script>
export default {
  name: "standardGenerateReport",
  data() {
    return {};
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
    clear(){
        
    }
  }
};
</script>

<style lang="scss" scoped>
.spread{
    background: $shadow-color;
}
</style>