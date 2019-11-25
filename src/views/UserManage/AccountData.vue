<template>
  <div class="account-data">
    <div class="add-box">
      <el-button type="primary" @click="openAddAccountDialog">新增账户</el-button>
    </div>
    <el-table class="table-box" :data="userData" border style="width: 100%">
      <el-table-column width="180" label="角色">
        <template slot-scope="scope">
          <el-select
            v-if="scope.row.edit"
            class="el-select"
            v-model="scope.row.role"
            placeholder="请选择角色"
            @change="updateAccountData(scope.row)"
          >
            <el-option
              v-for="option in options"
              :key="option.key"
              :label="option.role"
              :value="option.role"
            ></el-option>
          </el-select>
          <span v-else>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" label="账号">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.username"></el-input>
          <span v-else>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column width="160" label="操作">
        <template slot-scope="scope" v-if="scope.row.username!=='admin'">
          <el-button
            v-if="!scope.row.edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            v-else
            size="mini"
            type="success"
            @click="handleSave(scope.$index, scope.row)"
          >完成</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddAccount
      @update="getUser"
      :dialogVisible="dialogVisible"
      :options="options"
      @closeModal="closeModal"
    ></AddAccount>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import * as Interface from "@/models/interface";
import AddAccount from "@/views/UserManage/AddAccount.vue";

@Component({
  components: { AddAccount }
})
export default class AccountData extends Vue {
  userData = [] as any;
  dialogVisible: boolean = false;
  options: Interface.IRoleAccount[] = [
    {
      key: "admin",
      role: "管理员",
      des: "Super Administrator. Have access to view all pages."
    },
    {
      key: "editor",
      role: "客服",
      des: "Normal Editor. Can see all pages except permission page"
    },
    {
      key: "visitor",
      role: "游客",
      des: "Just a visitor. Can only see the home page and the document page"
    }
  ];

  created() {
    this.getUser();
  }

  get tHeight(): number {
    return document.body.offsetHeight;
  }

  getUser(): void {
    (this as typeof Vue.prototype).$axios
      .get(`api/users/allUsers`)
      .then((res: AxiosResponse) => {
        res.data.datas.forEach((item: any) => {
          item.edit = false;
        });
        this.userData = res.data.datas;
      });
  }

  openAddAccountDialog() {
    this.dialogVisible = true;
  }

  handleEdit(index: number, row: any): void {
    row.edit = true;
  }

  handleSave(index: number, row: any): void {
    console.log(row);
    row.edit = false;
    (this as typeof Vue.prototype).$axios
      .post(`api/users/editUser/${row._id}`, row)
      .then((res: AxiosRequestConfig) => {
        this.$message({
          type: "success",
          message: res.data.msg
        });
      });
  }

  handleDelete(index: number, row: any): void {
    (this as typeof Vue.prototype).$axios
      .delete(`api/users/deleteUser/${row._id}`)
      .then((res: AxiosResponse) => {
        this.$message({
          type: "success",
          message: res.data.msg
        });
      })
      .then(() => {
        this.userData.splice(index, 1);
      });
  }

  updateAccountData(row: any) {
    this.options.forEach(option => {
      if (option.role === row.role) {
        row.key = option.key;
        row.des = option.des;
      }
    });
  }

  closeModal() {
    this.dialogVisible = false;
  }
}
</script>
<style lang="scss" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>
