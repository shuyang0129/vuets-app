<template>
  <div class="login">
    <LoginHeader>
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
        slot="container"
        ref="ruleForm"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- UserName -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
            placeholder="账号"
          >
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- Password -->
        <el-form-item prop="pwd">
          <el-input
            type="text"
            v-model="ruleForm.pwd"
            auto-complete="off"
            placeholder="密码"
          >
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 登录button -->
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;"
            :loading="isLoginProcessing"
            @click.native.prevent="handleSubmit"
            >登录</el-button
          >
        </el-form-item>
        <!-- 7天登录和忘记密码 -->
        <el-form-item>
          <el-checkbox
            v-model="ruleForm.autoLogin"
            :checked="ruleForm.autoLogin"
            >7天内自动登录</el-checkbox
          >
          <el-button
            @click="$router.push('/password')"
            type="text"
            class="forget"
            >忘记密码？</el-button
          >
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LoginHeader from "./LoginHeader.vue";
import { FormItem } from "element-ui";
import { AxiosRequestConfig } from "axios";
import * as Interface from "@/models/interface";

@Component({
  components: { LoginHeader }
})
export default class Login extends Vue {
  @Action("setUser") setUser!: any;

  @Provide()
  isLoginProcessing: boolean = false;

  @Provide() ruleForm = <Interface.ILogin>{
    username: "",
    pwd: "",
    autoLogin: true // 是否自动登录
  };

  @Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        this.isLoginProcessing = true;
        (this as typeof Vue.prototype).$axios
          .post("api/users/login", this.ruleForm)
          .then((res: AxiosRequestConfig) => {
            this.isLoginProcessing = false;
            localStorage.setItem("tsToken", res.data.token);
            this.setUser(res.data.token);
            // Push to home page
            this.$router.push("/");
          })
          .catch(() => (this.isLoginProcessing = false));
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
.forget {
  float: right;
}
</style>
