<template>
  <div class="standard-list layout">
    <div class="search">
      <el-input v-model="code" placeholder="请输入标准编号或标准名称" class="textField" clearable></el-input>
      <div class="search-btn">搜 索</div>
    </div>
    <el-alert class="standard-alert" :title="title" type="success" show-icon :closable="false"></el-alert>
    <el-row style="margin-top: 15px;">
      <el-col :span="12">
        <div class="btn-group">
          <el-button
            :class="{ 'btn':true,'active':activeIndex == 0 }"
            type="primary"
            @click="indexChange(0)"
          >状态一</el-button>
          <el-button
            :class="{ 'btn':true,'active':activeIndex == 1 }"
            type="primary"
            @click="indexChange(1)"
          >状态二</el-button>
          <el-button
            :class="{ 'btn':true,'active':activeIndex == 2 }"
            type="primary"
            @click="indexChange(2)"
          >状态三</el-button>
          <el-button
            :class="{ 'btn':true,'active':activeIndex == 3 }"
            type="primary"
            @click="indexChange(3)"
          >状态四</el-button>
          <el-button
            :class="{ 'btn':true,'active':activeIndex == 4 }"
            type="primary"
            @click="indexChange(4)"
          >状态五</el-button>
        </div>
      </el-col>
      <el-col :span="12" class="btn-group text-right">
        <el-button class="btn btn-blue" icon="el-icon-plus" @click="addStandard">添加</el-button>
        <el-button class="btn btn-blue" icon="el-icon-plus" @click="batchUpload">上传</el-button>
        <el-button class="btn btn-blue" icon="el-icon-notebook-2" @click="generateReport">生成</el-button>
      </el-col>
    </el-row>
    <el-table
        :data="result"
        class="layout-main"
        height="100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
      >
        <el-table-column type="index" label="序号" width="50px"></el-table-column>
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :formatter="item.formatter"
        ></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="{ row }">
            <span class="status status-primary" v-if="row.status == 0">状态一</span>
            <span class="status status-primary" v-else-if="row.status == 1">状态二</span>
            <span class="status status-warning" v-else-if="row.status == 2">状态三</span>
            <span class="status status-danger" v-else-if="row.status == 3">状态四</span>
            <span class="status status-danger" v-else>状态五</span>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination class="text-center" background layout="prev, pager, next" :total="1000"></el-pagination>
    <addStandardDialog v-model="addVisible"></addStandardDialog>
    <batchUpload v-model="batchUploadVisible"></batchUpload>
    <standardGenerateReport v-model="reportVisible"></standardGenerateReport>
  </div>
</template>

<script>
export default {
  name: "newStandard",
  data() {
    return {
      code: "",
      total: 11,
      activeIndex: 0,
      result: [
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 1
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 0
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 1
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 4
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 1
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 1
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 1
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 3
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 2
        },
        {
          code: "1212-2002",
          name: "名称",
          pubDate: "2020-04-05",
          shishiDate: "2020-04-05",
          status: 1
        }
      ],
      columns: [
        { label: "编号", prop: "code" },
        { label: "名称", prop: "name" },
        { label: "发布日期", prop: "pubDate" },
        { label: "日期", prop: "shishiDate" }
      ],
      addVisible: false,
      batchUploadVisible: false,
      reportVisible: false,
    };
  },
  computed: {
    title() {
      return `共搜索到${this.total}条记录`;
    }
  },
  components:{
    addStandardDialog:() => import('@/views/new/components/addStandardDialog.vue'),
    batchUpload:() => import('@/views/new/components/batchUpload.vue'),
    standardGenerateReport:() => import('@/views/new/components/standardGenerateReport.vue'),
  },
  methods: {
    indexChange(index) {
      this.activeIndex = index;
    },
    addStandard(){
      this.addVisible = true;
    },
    batchUpload(){
      this.batchUploadVisible = true;
    },
    generateReport(){
      this.reportVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.standard-list {
  .search {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 60%;
    margin-bottom: 15px;
    border-radius: $radius/2;
    overflow: hidden;
    .textField {
      flex: 1;
      .el-input__inner {
        border-radius: 0px !important;
      }
    }
    &-btn {
      display: inline-block;
      padding: 0 15px;
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
  .standard-alert {
    color: #999;
    // & .el-alert__icon{
    //     color: #409EFF;
    // }
  }
}
</style>