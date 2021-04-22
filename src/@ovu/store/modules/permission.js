import { asyncRoutes, constantRoutes } from '@/router';
import { getRoutes, getAllRoutesAndAuth } from '../../api/role';
import Layout from '@/@ovu/layout';
import store from '@/store';

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, permissions = [], index = -1) {
  const res = [];
  routes.forEach((route, index) => {
    if (route.type === '1') return;
    const permission= permissions.filter(data => data.pid === route.id && data.permission)
    const tmp = {
      path: route.path,
      component:  route.isTop === 1 ? Layout : resolve => require([`@/views/${route.component}`], resolve),
      name: route.componentName,
      hidden: route.hidden === '0' ? true : false,
      meta: { title: route.name, icon: route.icon, permission,noCache:route.cache == "1" ? false : true  }
    };
    if (route.nodes) {
      const children = filterAsyncRoutes(route.nodes, permissions, index);
      if (children.length) tmp.children = children;
    }
    res.push(tmp);
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
    localStorage.setItem("routes",JSON.stringify(routes))
  }
};

const actions = {
  generateRoutes({ commit, state, rootState }, role) {
    return new Promise(async resolve => {
      // const allAuthCode = await getAllRoutesAndAuth({ appCode: 'ums' }).then(res => res.data);
      const { roleMenuTree, permissionList } = await getRoutes({
        userId: rootState.user.userId,
        appCode:store.state.user.appCode,
        roleId: role.roleId
      }).then(res => res.data);
      let accessedRoutes = [];
      if(roleMenuTree !== null) {
       
         accessedRoutes = filterAsyncRoutes(roleMenuTree.map(data => {
          let roleMenu =  {
            path: `/${data.path}`,
            name: data.name,
            component: Layout,
            hidden: data.hidden,
            isTop: 1,
            nodes:  data.nodes
          };
          if(!data.nodes || data.nodes.length<2){
            roleMenu.path=''
            const nodes =[]
            nodes.push(data)
            roleMenu.nodes = nodes
          }
          return roleMenu
        }), permissionList);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes)
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
