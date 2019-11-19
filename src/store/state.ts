import * as Interface from "@/models/interface";
import { routes } from "@/router/index";
import { RouteConfig } from "vue-router";

const state: any = {
  user: {} as Interface.IUSER,
  routes: routes as Array<RouteConfig>
};

export default state;
