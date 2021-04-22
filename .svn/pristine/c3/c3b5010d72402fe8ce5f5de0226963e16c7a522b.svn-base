import router from './router';
import store from './store'
import { beforeEach, afterEach } from '@/@ovu/utils/permission';
import { getToken,setToken } from '@/@ovu/utils/auth'; // get token from cookie
router.beforeEach((to, from, next) => {
 

  if (!to.matched.some(record => record.meta.requiresAuth)) {
  
    if (router.app.$keycloak.authenticated) {
      beforeEach(to, from, next);
    } else {
      const loginUrl = router.app.$keycloak.createLoginUrl()
      window.location.replace(loginUrl)
    }
  } else {
  
    if(to.path === '/index' || to.path === '/' ){
      next()
    }else if(to.path === '/register' || to.path === '/forget'){
     
      const hasToken = getToken();
      if(hasToken === 'undefined'){
        next()
       }else{
        beforeEach(to, from, next);
       }  
    }else{
      beforeEach(to, from, next);
    }
  }
});

router.afterEach(() => {
  afterEach();
});
