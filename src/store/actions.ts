import { Commit, Dispatch } from "vuex";
import jwtDecode from "jwt-decode";

interface IVuexContext {
  commit: Commit;
  dispatch: Dispatch;
}

const actions = {
  setUser(context: IVuexContext, userToken: string) {
    const decodedUser = jwtDecode(userToken);
    context.commit("SET_USER", decodedUser);
  }
};

export default actions;
