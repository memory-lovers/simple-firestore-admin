import Vuex from "vuex";
import * as root from "./root";

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {}
  });
};

export default createStore;
