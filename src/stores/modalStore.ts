import { defineStore } from "pinia";
import { ref } from "vue";
import { useRecipeStore } from "./recipeStore";

export const useModalStore = defineStore("modal", () => {
  const { toggleIsInteracting } = useRecipeStore();
  const loginModal = ref(false);
  const registerModal = ref(false);
  const choiceModal = ref(false);
  const deleteModal = ref(false);
  const modalMessage = ref<string | null>(null);
  const isDrawerOpen = ref(false);
  const isFormDrawerOpen = ref(false);

  function toggleChoiceModal(state: boolean | null = null) {
    choiceModal.value = state ?? !choiceModal.value;
  }
  function toggleDeleteModal(state: boolean | null = null) {
    deleteModal.value = state ?? !deleteModal.value;
  }
  function toggleLoginModal(
    state: boolean | null = null,
    message: string | null = null
  ) {
    loginModal.value = state ?? !loginModal.value;
    modalMessage.value = message;
    if (choiceModal) {
      toggleChoiceModal(false);
    }
  }
  function toggleRegisterModal(state: boolean | null = null) {
    registerModal.value = state ?? !registerModal.value;
    if (choiceModal) {
      toggleChoiceModal(false);
    }
  }
  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value;
  }
  function toggleFormDrawer(state: boolean | null = null) {
    isFormDrawerOpen.value = state ?? !isFormDrawerOpen.value;
  }
  return {
    loginModal,
    registerModal,
    choiceModal,
    modalMessage,
    isDrawerOpen,
    isFormDrawerOpen,
    deleteModal,
    toggleDeleteModal,
    toggleChoiceModal,
    toggleLoginModal,
    toggleRegisterModal,
    toggleDrawer,
    toggleFormDrawer,
  };
});
