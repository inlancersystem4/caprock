import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore, useAlertStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../pages/home.vue')
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: () => import('../pages/userCrud/UserList.vue')
    },
    {
      path: '/add-user',
      name: 'AddUser',
      component: () => import('../pages/userCrud/AddUser.vue')
    },
    {
      path: '/edit-user/:id',
      name: 'EditUser',
      component: () => import('../pages/userCrud/EditUser.vue')
    },
    {
      path: '/accounts',
      name: 'AccountList',
      component: () => import('../pages/accountCrud/AccountList.vue')
    },
    {
      path: '/add-account',
      name: 'AddAccount',
      component: () => import('../pages/accountCrud/AddAccount.vue')
    },
    {
      path: '/edit-account/:id',
      name: 'EditAccount',
      component: () => import('../pages/accountCrud/EditAccount.vue')
    },
    {
      path: '/roles',
      name: 'Roles',
      component: () => import('../pages/roles/Roles.vue')
    },
    {
      path: '/add-role',
      name: 'AddRole',
      component: () => import('../pages/roles/AddRole.vue')
    },
    {
      path: '/edit-role/:name/:id',
      name: 'EditRole',
      component: () => import('../pages/roles/EditRole.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../pages/profile/Profile.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../pages/Settings.vue')
    },
    {
      path: '/log-in',
      name: 'Login',
      component: () => import('../auth/Login.vue')
    },
    {
      path: '/page-not-found',
      name: '404',
      component: () => import('../pages/404.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/page-not-found'
    }
  ]
})


router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const publicPages = ['/log-in'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/log-in';
  }
});

export default router
