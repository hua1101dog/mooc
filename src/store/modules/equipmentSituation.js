const state = {
  selectedId: ""
};

const mutations = {
  SET_SELECTED_ID: (state, selectedId) => {
    state.selectedId = selectedId;
  }
};

const actions = {
  setCallVis({ commit }, val) {
    return new Promise(resolve => {
      commit("SET_ISCALL", val);
      window.workbench.changeVisible && window.workbench.changeVisible(val);
      resolve();
    });
  }
};

export default {
  namespaced: true, //开启命名空间
  state,
  mutations,
  actions
};
