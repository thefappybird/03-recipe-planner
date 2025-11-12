import { createRouter, createWebHistory } from "vue-router";
import PublicView from "../views/public/PublicView.vue";
import HomeView from "../views/public/views/HomeView.vue";
import ExploreView from "../views/public/views/ExploreView.vue";
import AboutView from "@/views/public/views/AboutView.vue";
import RegisterView from "@/views/public/views/RegisterView.vue";
import App from "@/App.vue";
import PrivateView from "@/views/private/PrivateView.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";
import NotFoundView from "@/views/public/NotFoundView.vue";
import FavoriteView from "@/views/private/views/FavoriteView.vue";
import RecipeView from "@/views/public/views/RecipeView.vue";
import AuthExploreView from "@/views/private/views/AuthExploreView.vue";
import { useModalStore } from "@/stores/modalStore";
import { useRecipeStore } from "@/stores/recipeStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "public",
      component: PublicView,
      redirect: "/home",
      meta: { requiresGuest: true }, // 👈 mark as auth-only
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          component: AboutView,
        },
        {
          path: "/explore",
          name: "explore",
          component: ExploreView,
        },
        {
          path: "/register",
          name: "register",
          component: RegisterView,
        },
        {
          path: "/recipe/:recipeId", // 👈 dynamic segment
          name: "recipe-details",
          component: RecipeView,
          props: true, // 👈 this passes route params as props to the component
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: PrivateView,
      meta: { requiresAuth: true }, // 👈 mark as auth-only
      children: [
        {
          path: "explore",
          name: "auth-explore",
          component: AuthExploreView,
        },
        {
          path: "favorites",
          name: "auth-favorites",
          component: FavoriteView,
        },
        {
          path: "recipe",
          name: "auth-recipe",
          children: [
            {
              path: ":recipeId", // 👈 dynamic segment
              name: "auth-recipe-details",
              component: RecipeView,
              props: true, // 👈 this passes route params as props to the component
            },
          ],
        },
      ],
    },

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { toggleFormDrawer } = useModalStore();
  const { currentUser, isAuthenticated } = storeToRefs(userStore);
  // adjust based on your store logic

  // Block logged-in users from accessing public pages
  if (to.meta.requiresGuest && isAuthenticated.value) {
    next({ name: "auth-explore" });
    return;
  }

  // Block non-logged-in users from private pages
  if (to.meta.requiresAuth) {
    if (!isAuthenticated.value) {
      next({ name: "home" });
      return;
    }

    // 👇 only fetch profile if not already loaded
    if (!currentUser.value) {
      try {
        await userStore.getCurrentUser();
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        userStore.handleLogout(); // optional
        next({ name: "home" });
        return;
      }
    }

    toggleFormDrawer(false);
  }

  next(); // proceed normally
});
export default router;
