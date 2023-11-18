import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/index.vue'

import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'

export const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'App',
    component: Layout,
    redirect: '/mockJson',
    meta: {title: 'Home'},
    children: [
      {
        path: '/Dashboard',
        name: 'Dashboard',
        meta: {title: 'Dashboard', icon: SettingOutlined},
        children: [
          {
            path: 'analysis',
            name: 'Analysis',
            meta: {title: '数据分析'},
            component: () => import('../view/Analysis.vue')
          }
        ]
      },
      {
        path: '/mockJson',
        name: 'MockJson',
        meta: {title: '模拟数据', icon: MailOutlined},
        component: () => import('../view/mock.vue')
      },
      {
        path: '/threejs',
        name: 'Threejs',
        meta: {title: '3D绘图', icon: AppstoreOutlined},
        component: () => import('../view/ThreeView.vue')
      },
    ]
  },
  // 捕获所有路由
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {title: '404'},
    component: () => import('../view/404.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
