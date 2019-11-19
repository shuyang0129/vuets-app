import * as Interface from "@/models/interface";
import { RouteConfig } from "vue-router";

const SET_USER = "SET_USER";
const SET_ROUTES = "SET_ROUTES";

const mutations = {
  [SET_USER](state: any, user: Interface.IUSER) {
    state.user = user;
  },
  [SET_ROUTES](state: any, routes: Array<RouteConfig>) {
    state.routes = routes;
  }
};

export default mutations;
