import * as Interface from "@/models/interface";
import { RouteConfig } from "vue-router";

const getters = {
  user(state: any): Interface.IUSER {
    return state.user;
  },
  routes(state: any): Array<RouteConfig> {
    return state.routes;
  }
};

export default getters;
