<template>
  <el-dialog :visible.sync="visible" width="40%" :before-close="close" append-to-body :close-on-click-modal="false">
    <div slot="title" class="text-center" style="font-size:120%;">批量上传</div>
    <el-form>
      <el-form-item label="请上传标准查新文件:">
        <el-upload
            :action="uploadUrl"
            multiple
            :file-list="fileList">
            <el-button size="mini" type="primary" round>上传文件</el-button>
            <div slot="tip" class="el-upload__tip">
                <el-row class="upload-alert-gray">
                    <el-col :span="20">
                        <!-- <el-alert title="" type="info" :closable="false"></el-alert> -->
                        您需要上传Excel文件，文件具体格式请参照模板。上传之前，请按照模板要求进行整理。
                    </el-col>
                    <el-col :span="4" class="text-right">
                        <el-button type="primary" size="mini" round>下载模板</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="btn-group text-right" style="margin-top: 100px;">
      <!-- <el-button class="btn" type="primary" size="middle">确定</el-button> -->
      <el-button class="btn" type="info" size="middle" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "batchUploadStandard",
  data() {
    return {
        fileList: [],
    };
  },
  computed:{
      uploadUrl(){
          return this.$store.state.uploadUrl;
      }
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
        this.fileList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-alert-gray{
    background: $shadow-color;
    padding: 0 6px;
}
</style>