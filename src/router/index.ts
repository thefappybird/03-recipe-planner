import { createRouter, createWebHistory } from "vue-router";
import PublicView from "../views/public/PublicView.vue";
import HomeView from "../views/public/views/HomeView.vue";
import BlogView from "../views/public/views/BlogView.vue";
import ContactView from "../views/public/views/ContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "public",
      component: PublicView,
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/public/views/AboutView.vue"),
        },

        {
          path: "/blog",
          name: "blog",
          component: BlogView,
        },
        {
          path: "/contact",
          name: "contact",
          component: ContactView,
        },
      ],
    },
  ],
});

export default router;
