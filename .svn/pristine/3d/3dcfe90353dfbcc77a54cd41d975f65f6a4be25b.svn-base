import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import { getUserInfo, getInfo} from '../../api/user';
import {
  getCompanyList,
  getNewProjectList,
  getNewRoleList,
  editCompanyIdAndProjectId
} from "@/@ovu/api/role";
import { appCode } from '@/settings';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userId: '',
  appCode: appCode,
  companyList:[],
  companyInfoId:'',
  projectId:'',
  currentRole: null,
  keycloak: {
    authenticated: false
  },
  userInfo: null,
  appId:'',
  ftype:''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_KEYCLOAK: (state, keycloak) => {
    state.keycloak = keycloak;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_COMPANY: (state, companyList) => {
    state.companyList = companyList;
  },
  SET_COMPANY_INFO_ID: (state, companyInfoId) => {
    sessionStorage.setItem("companyInfoId",companyInfoId)
    state.companyInfoId = companyInfoId;
  },
  SET_PROJECTID: (state, projectId) => {
    state.projectId = projectId;
  },
  CHANGE_APPCODE:(state,val) =>{
    state.appCode =val
  },
  SET_CURRENT_ROLE: (state, val) => {
    state.currentRole = val;
  },
  SET_USERINFO: (state, val) => {
    state.userInfo = val;
  },
  SET_APPID: (state, appId)=>{
    state.appId=appId
  },
  SET_FTYPE: (state, ftype)=>{
    state.ftype=ftype
  },
};

const actions = {
  // user login
  login({ commit, dispatch }, keycloak) {
    return new Promise(async (resolve, reject) => {
      commit('SET_TOKEN', keycloak.token);
      commit('SET_KEYCLOAK', keycloak);
      await keycloak.loadUserProfile().success(data => {
        commit('SET_NAME', data.username);
      });
      setToken(keycloak.token);
      resolve();
    });
  },

  // get user info
  getInfo({ commit, state, dispatch}, data) {
    return new Promise(async (resolve, reject) => {
      const userId = await getUserInfo().then(res => res.data);
      const userInfo = await getInfo(userId).then(res => res.data);
      commit('SET_USERID', userId); 
      commit('SET_USERINFO', userInfo); 
      
      //查询企业
      const companyList = await getCompanyList({
        userId,
        appCode:state.appCode
      }).then(res => res.data);
      let currentCompanyId;
      if(companyList && companyList.length>0) {
        currentCompanyId=sessionStorage.getItem("companyInfoId")
       let  flag=companyList.find((ele)=>ele.id==currentCompanyId)
         if(!flag){
          currentCompanyId = companyList[0].id
         } 
        commit('SET_COMPANY',companyList);
      }
      dispatch("setCompany", currentCompanyId);
      // 查询项目
      let formData = new FormData();
      let params = {
        userId,
        appCode:state.appCode,
        enterpriseId: currentCompanyId
      }
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
      const projectList =  await getNewProjectList(formData).then(res => res.data);
      let projectId;
      if(projectList && projectList.length>0) {
        projectId= projectList[0].id
      }
      dispatch("setProject", projectId);
      // 查询角色
      formData = new FormData();
      params = {
        userId,
        appCode:state.appCode,
        enterpriseId: currentCompanyId,
        projectId: projectId
      }
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
      if(formData.get("projectId")==="" || formData.get("projectId")==="null"){
        formData.set("projectId",null)
      }
      const roleList = await getNewRoleList(formData).then(res => res.data); 
      let roleIds = "" 
      if(roleList &&roleList.length>0){
         roleIds = roleList.map(e => e.id).join(",");
      }
      const roles =  { roleId: roleIds }
      commit("SET_CURRENT_ROLE", roles);
      commit('SET_ROLES',roles);
      resolve({ roles });
    });
  },
  setCompany({ commit, state }, data) {
    return new Promise(async (resolve, reject) => {
      await editCompanyIdAndProjectId({enterpriseId:data,projectId:state.projectId}).then(res => {
        commit('SET_COMPANY_INFO_ID', data);
      })
      resolve();
    });
  },
  setProject({ commit, state }, data) {
    return new Promise(async (resolve, reject) => {
      await editCompanyIdAndProjectId({enterpriseId:state.companyInfoId,projectId:data}).then(res => {
        commit('SET_PROJECTID', data);
      })
      resolve();
    });
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resetRouter();
      dispatch('tagsView/delAllViews', null, { root: true });
      state.keycloak.logout();
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', role, { root: true });

      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true });

      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
