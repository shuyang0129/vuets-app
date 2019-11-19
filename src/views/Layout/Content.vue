<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>

    <!-- 右侧页面 -->
    <el-main class="el-main">
      <!-- 面包屑 -->
      <div class="top">
        <i class="fa fa-reorder"></i>
        <el-breadcrumb class="breadcrumb" separator="/">
          <!-- <el-breadcrumb-item
            v-for="item in $router.currentRoute.matched"
            :key="item.path"
            :to="item.path"
            replace
          >{{item.meta.title}}</el-breadcrumb-item>-->
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumb"
            :key="index"
            :to="item.path"
          >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Content extends Vue {
  breadcrumb: any = [];

  initBreadcrumb() {
    this.breadcrumb.splice(0);
    this.breadcrumb.push({
      path: "/",
      title: "后台管理系统"
    });
    for (const matchedItem of this.$route.matched) {
      if (matchedItem && matchedItem.meta && matchedItem.meta.title) {
        this.breadcrumb.push({
          path: matchedItem.path,
          title: matchedItem.meta.title
        });
      }
    }
  }

  @Watch("$route")
  handleBreadcrumb() {
    this.initBreadcrumb();
  }

  created() {
    this.initBreadcrumb();
  }
}
</script>
<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>
