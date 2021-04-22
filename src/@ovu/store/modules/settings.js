import variables from '@/@ovu/styles/element-variables.scss';
import defaultSettings from '@/settings';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;
const state = {
  // theme: variables.theme,
  theme: sessionStorage.theme ? sessionStorage.theme : 'light',
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  clientHeight: 1140,
};

const getters = {
  getTheme: state => state.theme,
  getClientHeight: state => state.clientHeight
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  CHANGE_THEME: (state,val) => {
    sessionStorage.theme = val;
    state.theme = val;
  },
  SET_CLIENT_HEIGHT: (state,val) => {
    state.clientHeight = val;
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
  changeTheme({ commit }, data) {
    commit('CHANGE_THEME', data);
  },
  setClientHeight({commit}, data) {
    commit('SET_CLIENT_HEIGHT', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

