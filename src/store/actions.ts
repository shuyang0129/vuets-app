import { Commit, Dispatch } from "vuex";
import { routes } from "@/router/index";
import jwtDecode from "jwt-decode";

interface IVuexContext {
  commit: Commit;
  dispatch: Dispatch;
}

const actions = {
  setUser(context: IVuexContext, userToken: string) {
    const decodedUser: any = jwtDecode(userToken);
    context.commit("SET_USER", decodedUser);
    const { key } = decodedUser;
    let availableRoutes = permissionedRoutes(routes, key);
    console.log("availableRoutes", availableRoutes);
    context.commit("SET_ROUTES", availableRoutes);
  }
};

function permissionedRoutes(routes: Array<any>, key: string) {
  return routes.filter(route => {
    if (hasPermission(route, key)) {
      if (route.children && route.children.length) {
        route.children = permissionedRoutes(route.children, key);
      }
      return true;
    } else {
      return false;
    }
  });
}

function hasPermission(route: any, key: string): boolean {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(key);
  }
  return true;
}

export default actions;
