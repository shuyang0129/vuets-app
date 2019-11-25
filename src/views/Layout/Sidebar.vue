<template>
  <el-scrollbar class="el-scrollbar">
    <el-menu class="el-menu-slide" :default-active="$route.path" router>
      <template v-for="item in menuItem">
        <el-menu-item
          v-if="item.children.length === 1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.path" :key="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path">
            <i :class="subItem.meta.icon"></i>
            <span slot="title">{{subItem.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import * as Interface from "@/models/interface";
import { RouteConfig } from "vue-router";

@Component({
  components: {}
})
export default class Sidebar extends Vue {
  @Getter("routes") getRouter!: Array<RouteConfig>;

  get menuItem(): Array<RouteConfig> {
    return this.getRouter.filter((item: any) =>
      Boolean(item.isShowOnSideMenu && item.hasOwnProperty("children"))
    );
  }
}
</script>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
