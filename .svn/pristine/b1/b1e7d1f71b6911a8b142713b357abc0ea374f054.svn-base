import Vue from 'vue';
import router from '@/router';

Vue.directive('permission', {
  inserted(el, binding, vnode) {
    const { value, arg } = binding;
    // arg: edit, delete, add, show, search
    // console.log(router.history.current.meta.permission,99444);

    const permission = router.history.current.meta.permission;
    let notHasPermission = false;

    if (permission && Array.isArray(permission)) {
      permission.some(ele => {
        if (ele.permission.indexOf(arg) != -1) {
          if (ele.selected == "yes") {
            notHasPermission = false
          } else {
            notHasPermission = true
          }
        }
      })
    }

    if (notHasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});

