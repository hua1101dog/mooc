// import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: sessionStorage.theme ? sessionStorage.theme : 'light',
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  isState: sessionStorage.isState,
  clientHeight: 1140,
  videos: [],
  showMenuAndTags:true

};

const getters = {
  getTheme: state => state.theme,
  getIsState: state => state.isState,
  getClientHeight: state => state.clientHeight
};

const mutations = {
  setVideos(state, value) {
    state.videos.push(value);
  },
  setClientHeight(state, value) {
    state.clientHeight = value;
  },
  changeIsState(state, value) {
    sessionStorage.setItem('isState', value);
    state.isState = value;
  },
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  changeTheme(state, val) {
    sessionStorage.theme = val;
    state.theme = val;
  },
  setMenuAndTags(state, value) {
    state.showMenuAndTags = value;
    state.tagsView = value;
  },
};

const actions = {
  addVideos({ commit }, data) {
    commit('setVideos', data);
  },
  destroyVideo({ state }) {
    if (!state.videos.length) return;
    for (const el of state.videos) {
      if (el && el.contentWindow && el.contentWindow.closePlayer) {
        el.contentWindow.postMessage('close', '*');
        el.contentWindow.closePlayer();
      }
    }
    state.videos = [];
  },
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
  setClientHeight({ commit }) {
    const clientHeight =
      document.compatMode === 'CSS1Compat'
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
    commit('setClientHeight', clientHeight);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

