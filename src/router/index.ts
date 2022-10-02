import type {RouteRecordRaw} from "vue-router";
import type { Plugin} from "vue";
import {createRouter, createWebHistory} from "vue-router";
import logger from "@/utils/logger";
export const installRouter: Plugin = (app)=> {
  logger.info('installRouter plugin instanciated')
  const routes: Array<RouteRecordRaw>  = [
    {
      path: "/",
      component: ()=> import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: "/",
          name: "subscribe",
          component: ()=> import('@/views/SubscribeView.vue'),
        },
        {
          path: '/ref/',
          name: 'referral',
          meta: { title: `Referral` },
          component: ()=> import('@/layouts/DummyLayout.vue'),
          children: [
            {
              path: "/ref/:refId(.*)*",
              name: 'referralSubscribe',
              component: ()=>import('@/views/SubscribeView.vue'),
            },

          ]
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: ()=>import('@/views/NotFound.vue'),
    },
  ];
  logger.info('installRouter routes created')
  const Router = createRouter({
    history: createWebHistory('/'),
    routes: routes,
  });
  app.use(Router)
}