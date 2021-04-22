import Layout from '@/layout';

import temporaryRoutes from '@/router/temporaryRoutes';
import store from '@/store';

// 获取动态路由方法
async function getRouterList() {
  // 登录之后获取动态路由

  let userRouter = [];

  userRouter.push({ path: '*', redirect: '/404', hidden: true });
  userRouter = temporaryRoutes;
  console.log(temporaryRoutes);
  return userRouter;
}

export default getRouterList;
