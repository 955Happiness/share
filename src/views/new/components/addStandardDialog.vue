<template>
  <el-dialog :visible.sync="visible" width="40%" :before-close="close" append-to-body :close-on-click-modal="false">
    <div slot="title" class="text-center" style="font-size:120%;">请填写相关信息</div>
    <el-form :model="form" label-width="80px">
      <el-form-item label="编号:" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-group text-center" style="margin-top: 50px;">
      <el-button class="btn" type="primary" size="middle">确定</el-button>
      <el-button class="btn" type="info" size="middle" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "addStandardDialog",
  data() {
    return {
      form: {
        name: "",
        code: ""
      }
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
      this.form = {
        name: "",
        code: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>