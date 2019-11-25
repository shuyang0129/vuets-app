import * as Interface from "@/models/interface";
import { RouteConfig } from "vue-router";

const state: any = {
  user: {} as Interface.IUSER,
  routes: [] as Array<RouteConfig>
};

export default state;
