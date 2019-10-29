import { ActionContext, ActionTree } from "vuex";

export interface Actions<S, R> extends ActionTree<S, R> {}

export interface ModuleActions<S, R> extends ActionTree<S, R> {}

export interface RootState {}
