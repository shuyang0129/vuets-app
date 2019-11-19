<template>
  <div class="table-data">
    <div class="search-box">
      <el-input size="small" class="el-input" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
      <el-button
        icon="el-icon-search"
        size="small"
        type="primary"
        @click="handleSearch"
        :loading="isSearching"
      >搜索</el-button>
    </div>
    <el-table
      class="table-box"
      :data="tableData"
      border
      style="width: 100%"
      :height="`${tHeight}px`"
    >
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <el-table-column prop="title" label="课程名称"></el-table-column>
      <el-table-column width="120" prop="level" label="课程等级"></el-table-column>
      <el-table-column width="120" prop="type" label="技术栈"></el-table-column>
      <el-table-column width="120" prop="count" label="报名人数"></el-table-column>
      <el-table-column width="160" prop="date" label="上线日期"></el-table-column>
      <el-table-column width="160" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openModal(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" ref="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="sizeOfData"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSizeOfData"
      ></el-pagination>
    </div>
    <EditDialog :dialogVisible="dialogVisible" :dialogData="dialogData" @closeModal="closeModal"></EditDialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import EditDialog from "@/views/DataManage/EditDialog.vue";
import * as Interface from "@/models/interface";

@Component({
  components: { EditDialog }
})
export default class TableData extends Vue {
  searchVal: string = "";
  tableData: any = [];
  tHeight: number = document.body.offsetHeight - 270;
  currentPage: number = 1;
  sizeOfData: number = 5;
  totalSizeOfData: number = 0;
  isSearching: boolean = false;
  dialogVisible: boolean = false;
  dialogData = {} as Interface.IDialogData;

  created() {
    this.loadData();
  }

  loadData() {
    (this as typeof Vue.prototype).$axios
      .get(`api/profiles/loadMore/${this.currentPage}/${this.sizeOfData}`)
      .then((res: AxiosResponse) => {
        this.tableData = res.data.data.list;
        this.totalSizeOfData = res.data.data.total;
      });
  }

  loadSearchData(): void {
    this.isSearching = true;
    (this as typeof Vue.prototype).$axios
      .get(
        `api/profiles/search/${this.searchVal}/${this.currentPage}/${this.sizeOfData}`
      )
      .then((res: AxiosResponse) => {
        console.log(res.data.datas);
        this.tableData = res.data.datas.list;
        this.totalSizeOfData = res.data.datas.total;
      })
      .finally(() => (this.isSearching = false));
  }

  handleSizeChange(changedSize: number): void {
    this.currentPage = 1;
    this.sizeOfData = changedSize;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }

  handleCurrentChange(pageNum: number): void {
    this.currentPage = pageNum;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }

  handleSearch(): void {
    this.currentPage = 1;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }

  openModal(row: any): void {
    this.dialogVisible = true;
    this.dialogData = row;
  }

  closeModal() {
    this.dialogVisible = false;
  }
}
</script>
<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
