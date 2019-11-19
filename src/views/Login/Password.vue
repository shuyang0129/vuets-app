<template>
  <div class="password">
    <LoginHeader>
      <el-form :model="ruleForm" :rules="rules" slot="container" ref="ruleForm">
        <div class="title">
          <h3>找回密码</h3>
        </div>
        <!-- UserName -->
        <el-form-item prop="username">
          <el-input
            type="text"
            label-position="left"
            label-width="0px"
            placeholder="账号"
            auto-complete="off"
            v-model="ruleForm.username"
          >
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- Password -->
        <el-form-item prop="email">
          <el-input
            type="text"
            label-position="left"
            label-width="0px"
            placeholder="邮箱"
            auto-complete="off"
            v-model="ruleForm.email"
          >
            <i slot="prefix" class="fa fa-envelope-o"></i>
          </el-input>
        </el-form-item>
        <!-- Submit -->
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="handleSubmit"
            :loading="isLoading"
            style="width: 100%;"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import LoginHeader from "./LoginHeader.vue";
import * as Interface from "@/models/interface";
import { AxiosResponse } from "axios";
import { ElementUIComponent } from "element-ui/types/component";
import ElementUI from "element-ui";

@Component({
  components: { LoginHeader }
})
export default class Password extends Vue {
  @Provide()
  isLoading: boolean = false;

  @Provide()
  ruleForm = <Interface.IPassword>{
    username: "",
    email: ""
  };

  @Provide()
  rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      { required: true, message: "请输入邮箱地址", trigger: "blur" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur"]
      }
    ]
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        this.isLoading = true;
        (this as typeof Vue.prototype).$axios
          .post("/api/users/findPwd", this.ruleForm)
          .then((res: AxiosResponse) => {
            this.$message({
              message: res.data.msg,
              type: "success",
              onClose: () => {
                this.$router.push("/login");
              }
            });
            this.isLoading = false;
          })
          .catch((err: any) => {
            this.isLoading = false;
          });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
</style>
