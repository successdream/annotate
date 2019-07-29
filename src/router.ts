import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import axios from 'axios';

import Home from '@/views/Home/Home.vue';
import Login from './views/Login.vue';
import User from './views/User.vue';
import Tag from '@/views/Tag/Tag.vue';
import Images from './views/Image.vue';
import Template from '@/views/Template/Template.vue';
import Task from '@/views/Task/Task.vue';
import GoingTask from '@/views/Task/GoingTask.vue';
import HistoryTask from '@/views/Task/HistoryTask.vue';
import NewTask from '@/views/Task/NewTask.vue';
import Annotation from './views/Annotation/Annotation.vue';


Vue.use(Router);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'tag',
        component: Tag,
        name: 'tag',
        meta: {
          title: '标签',
          iconClass: 'icon ion-android-bookmark',
        },
      },
      {
        path: 'Images',
        component: Images,
        name: 'Images',
        meta: {
          title: '图像',
          iconClass: 'icon ion-images',
        },
      },
      {
        path: 'user',
        component: User,
        name: 'user',
        meta: {
          title: '用户',
          iconClass: 'ion-person-stalker',
        },
      },
      {
        path: 'template',
        component: Template,
        name: 'template',
        meta: {
          title: '模板',
          iconClass: 'el-icon-setting',
        },
      },
      {
        path: 'task',
        component: Task,
        name: 'task',
        meta: {
          title: '任务',
          iconClass: 'el-icon-edit-outline',
        },
        children:[
          {
            path: 'newtask',
            component: NewTask,
            name: 'newtask',
            meta: {
              title: '新建任务',
              iconClass: 'el-icon-setting',
            }
          },
          {
            path: 'historytask',
            component: HistoryTask,
            name: 'historytask',
            meta: {
              title: '历史任务',
              iconClass: 'el-icon-setting',
            }
          },
          {
            path: 'goingtask',
            component: GoingTask,
            name: 'goingtask',
            meta: {
              title: '标注中任务',
              iconClass: 'el-icon-setting',
            }
          },
          
        ]
        
      },
      {
        path: 'annotation',
        component: Annotation,
        name: 'annotation',
        meta: {
          title: '标注',
          iconClass: 'el-icon-search',
        },
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '*',
    redirect: {path: '/'},
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const auth = axios.defaults.headers.common.Authorization;
//   if (!auth && to.path !== '/login') {
//     next({path: '/login'});
//   } else {
//     next();
//   }
// });

export default router;
