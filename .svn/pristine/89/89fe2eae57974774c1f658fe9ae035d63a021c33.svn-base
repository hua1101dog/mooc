import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// import store from '@/store';
/* Layout */
import Layout from '@/@ovu/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export let constantRoutes = [

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forget',
    component: () => import('@/views/register/forget-password/index'),
    hidden: true,
    meta: {
      requiresAuth: true
    }
  },

  // {
  //   path: '/mooc',
  //   component: Layout,
  //   hidden: false,
  //   children: [
  //     {
  //       path: 'bannerMange',
  //       component: () => import('@/views/mooc/bannerMange/index'),
  //       name: 'bannerMange',
  //       meta: { title: '首页banner', icon: 'icon-home' }
  //       // hide: true
  //     }
  //   ]
  // },
  // {
  //   path: '/coursePage',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/mooc/course/coursePage'),
  //       name: 'coursePage',
  //       meta: { title: '课程', icon: 'icon-home' }
  //     }
  //   ]
  // },
  {
    path: '/create',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/mooc/course/creatCourse'),
        name: 'coursePage',
        meta: { title: '新增课程', icon: 'icon-home' },
        hidden: true
      }
    ]
  },
  {
    path: '/courseManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/mooc/course/courseManage'),
        name: 'creatCourse',
        meta: { title: '课程管理', icon: 'icon-home' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/moocTeacher',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/mooc/moocTeacher/index'),
  //       name: 'teacher',
  //       meta: { title: '讲师', icon: 'icon-home' }

  //     }
  //   ]
  // },
  // {
  //   path: '/subjectManage',
  //   component: Layout,
  //   hidden: false,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/mooc/subjectManage/index'),
  //       name: 'subjectManage',
  //       meta: { title: '题库管理', icon: 'icon-home' }
  //     }
  //   ]
  // },
  {
    path: '/paper',
    component: Layout,
    hidden: true,
    children: [
      // {
      //   path: 'index',
      //   component: () => import('@/views/mooc/paper/index'),
      //   name: 'paperManage',
      //   meta: { title: '试卷库管理', icon: 'icon-home' }
      // },
      {
        path: 'addPaper',
        component: () => import('@/views/mooc/paper/addPape'),
        name: 'addPape',
        meta: { title: '试卷', icon: 'icon-home' },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/mooc/paper/detail'),
        name: 'paperDetail',
        meta: { title: '试卷详情', icon: 'icon-home' },
        hidden: true
      }

    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: { title: '测评管理', icon: 'icon-home' },
    hidden: true,
    children: [

      {
        path: 'addTest',
        component: () => import('@/views/mooc/test/addTest'),
        name: 'addTest',
        meta: { title: '测评', icon: 'icon-home' },
        hidden: true
      },

      {
        path: 'manage',
        component: () => import('@/views/mooc/test/manage'),
        name: 'testManage',
        meta: { title: '测评管理', icon: 'icon-home' },
        hidden: true
      }

    ]
  },
  {
    path: '/exam',
    component: Layout,
    meta: { title: '考试管理', icon: 'icon-home' },
    hidden: true,
    children: [
      // {
      //   path: 'project',
      //   component: () => import('@/views/mooc/exam/project'),
      //   name: 'ex_project',
      //   meta: { title: '考试科目', icon: 'icon-home' }
      // },
      {
        path: 'addExam',
        component: () => import('@/views/mooc/exam/addExam'),
        name: 'addExam',
        meta: { title: '考试', icon: 'icon-home' },
        hidden: true
      },

      {
        path: 'manage',
        component: () => import('@/views/mooc/exam/manage'),
        name: 'examManage',
        meta: { title: '考试管理', icon: 'icon-home' },
        hidden: true
      }
      // {
      //   path: 'examList',
      //   component: () => import('@/views/mooc/exam/list'),
      //   meta: { title: '考试列表', icon: 'icon-home' },
      //   name: 'examList',
      // }

    ]
  },
  // {
  //   path: '/student',
  //   component: Layout,
  //   meta: { title: '学员管理', icon: 'icon-home' },
  //   children: [

  //     {
  //       path: 'list',
  //       component: () => import('@/views/mooc/student/list'),
  //       name: 'stuList',
  //       meta: { title: '学员列表', icon: 'icon-home' },

  //     }

  //   ]
  // },
  {
    path: '/showTicket',
    component: () => import('@/views/mooc/showTicket'),
    hidden: true,
    name: 'showTicket',
    meta: { title: '查看准考证', icon: 'icon-home', requiresAuth: true }
  },
  {
    path: '/answer',
    component: Layout,
    hidden: false,
    children: [
      // {
      //   path: 'list',
      //   component: () => import('@/views/mooc/answer/list'),
      //   name: 'answerList',
      //   meta: { title: '答卷管理', icon: 'icon-home' }
      // },

      {
        path: 'detail',
        component: () => import('@/views/mooc/answer/detail'),
        name: 'answerDetail',
        meta: { title: '答卷详情', icon: 'icon-home' },
        hidden: true
      }

    ]
  }

];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
