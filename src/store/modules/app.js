import Cookies from "js-cookie";

const state = {
  sidebar: {
    opened: Cookies.get("sidebarStatus")
      ? !!+Cookies.get("sidebarStatus")
      : true,
    withoutAnimation: false
  },
  device: "desktop",
  size: Cookies.get("size") || "small",
  platform: "",
  menuDrawer: false,
  global: false
};

const getters = {
  getPlatform: state => state.platform,
  getMenuDrawer: state => state.menuDrawer
};

const mutations = {
  CHANGE_DRAWER: (state, value) => {
    state.menuDrawer = value;
  },
  CHANGE_PLATFORM: (state, value) => {
    state.platform = value;
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", 1);
    } else {
      Cookies.set("sidebarStatus", 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set("sidebarStatus", 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set("size", size);
  },
  SET_GLOBAL: (state, global) => {
    state.global = global;
    Cookies.set("global", global);
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
  setGlobal({ commit }, global) {
    commit("SET_GLOBAL", global);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
