<template>
  <el-dialog
    width="50%"
    title="新增账户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form
      class="form-box"
      :model="accountData"
      :rules="rules"
      label-position="left"
      label-width="100px"
      size="small"
      ref="ruleForm"
    >
      <el-form-item label="请选择角色" prop="role">
        <el-select
          class="el-select"
          v-model="accountData.role"
          placeholder="请选择角色"
          @change="updateAccountData"
        >
          <el-option
            v-for="option in  options"
            :key="option.key"
            :label="option.role"
            :value="option.role"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入账号" prop="username" class="el-input">
        <el-input
          type="text"
          v-model="accountData.username"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal">取消</el-button>
      <el-button @click="submitForm" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as Interface from "@/models/interface";
import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

@Component({
  components: {}
})
export default class AddAccount extends Vue {
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Array) options!: Interface.IRoleAccount[];
  accountData = {} as Interface.IAddAccount;
  rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "change" }]
  };

  closeModal(): void {
    this.$emit("closeModal");
  }

  updateAccountData(): void {
    this.options.forEach(option => {
      if (option.role === this.accountData.role) {
        this.accountData.key = option.key;
        this.accountData.des = option.des;
      }
    });
  }

  @Emit("closeModal")
  submitForm(): void {
    (this as typeof Vue.prototype).$refs.ruleForm.validate((valid: boolean) => {
      if (valid) {
        (this as typeof Vue.prototype).$axios
          .post(`api/users/addUser`, this.accountData)
          .then((res: AxiosRequestConfig) => {
            this.$emit("update");
            this.$message({
              type: "success",
              message: res.data.msg
            });
          })
          .finally(() => {
            (this as typeof Vue.prototype).$refs.ruleForm.resetFields();
          });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>

