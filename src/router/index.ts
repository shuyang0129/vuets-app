import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout/Index.vue";
import jwtDecode from "jwt-decode";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "dashboard",
    isShowOnSideMenu: true,
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页", icon: "fa fa-home" },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    isShowOnSideMenu: false,
    meta: { title: "系统登录" },
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: "/password",
    name: "password",
    isShowOnSideMenu: false,
    meta: { title: "找回密码" },
    component: () => import("@/views/Login/Password.vue")
  },
  {
    path: "/dataManage",
    name: "dataManage",
    isShowOnSideMenu: true,
    meta: { title: "数据管理", icon: "fa fa-database" },
    redirect: "/tableData",
    component: Layout,
    children: [
      {
        path: "/tableData",
        name: "tableData",
        meta: { title: "表格管理", icon: "fa fa-table" },
        component: () => import("@/views/DataManage/TableData.vue")
      },
      {
        path: "/chartsData",
        name: "chartsData",
        meta: { title: "图表管理", icon: "fa fa-bar-chart" },
        component: () => import("@/views/DataManage/ChartsData.vue")
      },
      {
        path: "/formData",
        name: "formData",
        meta: {
          title: "表单管理",
          icon: "fa fa-file-text-o",
          roles: ["admin", "editor"]
        },
        component: () => import("@/views/DataManage/FormData.vue")
      }
    ]
  },
  {
    path: "/userManage",
    name: "userManage",
    isShowOnSideMenu: true,
    redirect: "/accountData",
    component: Layout,
    children: [
      {
        path: "/accountData",
        name: "accountData",
        meta: { title: "账户管理", icon: "fa fa-user-plus", roles: ["admin"] },
        component: () => import("@/views/UserManage/AccountData.vue")
      }
    ]
  },
  {
    path: "/user",
    isShowOnSideMenu: false,
    redirect: "/userInfo",
    component: Layout,
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        meta: { title: "个人中心" },
        component: () => import("@/views/UserManage/UserInfo.vue")
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    isShowOnSideMenu: false,
    meta: { title: "404" },
    component: () => import("@/views/404.vue")
  },
  {
    path: "*",
    isShowOnSideMenu: false,
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLogin = Boolean(localStorage.tsToken);
  if (to.path === "/login" || to.path === "/password") {
    next();
  } else {
    if (isLogin) {
      if (to.meta && to.meta.roles) {
        const { key }: any = jwtDecode(localStorage.tsToken);
        to.meta.roles.includes(key)
          ? next()
          : next({ path: "/404", replace: true });
      }
    } else {
      next("/login");
    }
  }
  if (to.path !== from.path) next();
});

export default router;
