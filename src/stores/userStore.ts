import type { User } from "@/types/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { userService } from "@/services/userService";
import { handleError } from "@/util/helperFunctions";
import { useToastStore } from "./toastStore";
import { useModalStore } from "./modalStore";
import router from "@/router";

export const useUserStore = defineStore("userStore", () => {
  const loadingState = ref(false);
  const currentUser = ref<User | null>(null);
  const toastStore = useToastStore();
  const modalStore = useModalStore();
  const token = ref<string | null>(sessionStorage.getItem("token"));
  const isAuthenticated = computed(() => !!token.value);

  async function handleRegister(formData: any) {
    try {
      loadingState.value = true;
      await userService.register(formData);
      toastStore.addToast("Successfully registered.", "success");
      router.push({ name: "home" });
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  async function handleLogin(formData: any) {
    try {
      loadingState.value = true;
      const currToken = await userService.login(formData); // should return JWT
      if (!currToken) throw new Error("Invalid credentials");

      token.value = currToken;
      sessionStorage.setItem("token", currToken);

      toastStore.addToast("Successfully logged in.", "success");
      modalStore.toggleLoginModal();
      router.push({ name: "auth-explore" });
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  function handleLogout() {
    token.value = null;
    sessionStorage.removeItem("token");
    router.push({ name: "home" });
  }
  async function getCurrentUser() {
    try {
      loadingState.value = true;
      const response = await userService.getProfile();
      currentUser.value = response;
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  return {
    token,
    isAuthenticated,
    loadingState,
    currentUser,
    handleRegister,
    handleLogin,
    handleLogout,
    getCurrentUser,
  };
});
