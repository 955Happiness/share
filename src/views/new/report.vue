<template>
  <div class="layout">
    <el-row>
      <el-col :span="20">
        <el-form :model="form" label-width="80px" inline>
          <el-form-item label="人名:" prop="user">
            <el-input v-model="form.user" size="small"></el-input>
          </el-form-item>
          <el-form-item label="时间:" prop="date">
            <el-date-picker
              v-model="form.date"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" class="btn-group">
        <el-button class="btn" type="primary">搜 索</el-button>
        <el-button class="btn" type="info">重 置</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="result"
    class="layout-main"
    height="100%"
    :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}"
    stripe
    >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column v-for="(item,index) in columns" :key="index" :label="item.label" :prop="item.prop" :formatter="item.formatter"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="{ row }">
                <el-link type="primary" :id="row.id">查看</el-link>
                <el-link style="margin-left:10px;" type="primary" :id="row.id">下载</el-link>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="text-center" background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "newReport",
  data() {
    return {
      form: {
        user: "",
        date: []
      },
      result: [
        { date: "2020-04-05",user: "李四" },
        { date: "2020-04-05",user: "李四" },
        { date: "2020-04-05",user: "李四" },
        { date: "2020-04-05",user: "李四" },
      ],
      columns: [
        { label: "日期", prop: "date" },
        { label: "人", prop: "user" },
      ]
    };
  },
  methods: {
    clear() {
      this.form = {
        user: "",
        date: []
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>