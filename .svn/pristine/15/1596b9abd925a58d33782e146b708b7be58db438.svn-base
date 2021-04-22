import router from '@/router';
import store from '@/store';
import {
  Message
} from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken,setToken } from './auth'; // get token from cookie
import getPageTitle from './get-page-title';

NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

const whiteList = ['/auth-redirect','/showTicket']; // no redirect whitelist

export const beforeEach = async (to, from, next) => {
  // start progress bar
  NProgress.start();
 
  // set page title
  document.title = getPageTitle(to.meta.title);
   //先判断是否是白名单,如果是就不用判断是否有token
   if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
  
    next();
  } else{
    //如果不是白名单,判断是否有token
    const hasToken = getToken();
   
   if (hasToken) {
     if (to.path === '/') {
       // if is logged in, redirect to the home page// next({ path: '/' });
       next({ path: '/index' });
       NProgress.done();
     }else if(to.path === '/register'){
       next({ path: '/index' });
       NProgress.done();
     }else{
       // debugger
       // determine whether the user has obtained his permission roles through getInfo
       // const hasProject = store.getters.projects && store.getters.projects.length > 0;
       const hasRoles = store.getters.currentRole;
       if (hasRoles) {
         if(to.matched.length == 0){
           next({ path: '/home' });
           NProgress.done();
         }else{
           next();
         }
       } else {
         try {
           // get user info
           // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
           // debugger
           await store.dispatch('user/getInfo');
           // generate accessible routes map based on roles
           
           const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.currentRole);
           // dynamically add accessible routes
           router.addRoutes(accessRoutes);
           // hack method to ensure that addRoutes is complete
           // set the replace: true, so the navigation will not leave a history record
           next({
             ...to,
             replace: true
           });
         } catch (error) {
           // remove token and go to login page to re-login
           // await store.dispatch('user/resetToken');
           // Message.error(error || 'Has Error');
           // initSecurity(to, from, next);
           NProgress.done();
         }
       }
     }
   } else {
  /* has no token*/
      // other pages that do not have permission to access are redirected to the login page.
       // initSecurity(to, from, next);
       NProgress.done();
   }
  }
 
};

export const afterEach = () => {
  // finish progress bar
  NProgress.done();
};
