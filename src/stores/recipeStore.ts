import { ref } from "vue";
import { defineStore } from "pinia";
import type { PagedRecipes, Recipe, RecipeFilter } from "@/types/interfaces";
import recipeService from "@/services/recipeService.ts";
import { useToastStore } from "./toastStore";
import { handleError } from "@/util/helperFunctions";
import { AxiosError } from "axios";
import { useUserStore } from "./userStore";
import { useModalStore } from "./modalStore";
import router from "@/router";

export const useRecipeStore = defineStore("recipes", () => {
  const toastStore = useToastStore();
  const userStore = useUserStore();
  const modalStore = useModalStore();
  const fetchedRecipes = ref<PagedRecipes>();
  const loadingState = ref(false);
  const isInteracting = ref<string>("");
  const isEditing = ref(false);

  function toggleIsInteracting(id: string) {
    isInteracting.value = id;
  }
  async function addOrEditRecipe(recipe: any) {
    try {
      loadingState.value = true;
      let message = "";
      if (isInteracting.value) {
        isEditing.value = true;
        message = await recipeService.updateRecipe(isInteracting.value, recipe);
      } else {
        message = await recipeService.createRecipe(recipe);
      }
      toastStore.addToast(message, "success");
      await userStore.getCurrentUser();
    } catch (error) {
      handleError(error);
    } finally {
      toggleIsInteracting("");
      isEditing.value = false;
      loadingState.value = false;
    }
  }
  async function deleteRecipe() {
    try {
      loadingState.value = true;
      let message = await recipeService.deleteRecipe(isInteracting.value);

      toastStore.addToast(message, "success");
      await userStore.getCurrentUser();
    } catch (error) {
      console.log("aaaaaa");
      handleError(error);
    } finally {
      router.push({ name: "auth-explore" });
      toggleIsInteracting("");
      modalStore.toggleDeleteModal(false);
      loadingState.value = false;
    }
  }
  async function getRecipeById(recipeId: string = isInteracting.value) {
    try {
      loadingState.value = true;

      if (!recipeId) return null;
      const response = await recipeService.getRecipeById(recipeId);

      if (response) {
        // Sort steps safely
        response.steps = [...(response.steps || [])].sort(
          (a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0)
        );
      }

      return response;
    } catch (error) {
      // handleError(error);
      return null;
    } finally {
      loadingState.value = false;
    }
  }
  async function getDashRecipes() {
    try {
      loadingState.value = true;
      const response = await recipeService.getAllRecipes();
      fetchedRecipes.value = response;
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  async function filterRecipes(filter: RecipeFilter | null) {
    let response;
    try {
      loadingState.value = true;
      if (!filter) {
        response = await recipeService.getAllRecipes();
      } else {
        response = await recipeService.getFilteredRecipes(filter);
      }
      fetchedRecipes.value = response;
    } catch (error) {
      if (error instanceof AxiosError) {
        toastStore.addToast(error.response?.data?.message, "error");
      } else if (error instanceof Error) {
        fetchedRecipes.value = response;
        toastStore.addToast(error.message, "error");
      } else {
        fetchedRecipes.value = response;
        throw error;
      }
    } finally {
      loadingState.value = false;
    }
  }

  return {
    fetchedRecipes,
    loadingState,
    isInteracting,
    isEditing,
    toggleIsInteracting,
    addOrEditRecipe,
    deleteRecipe,
    getDashRecipes,
    filterRecipes,
    getRecipeById,
  };
});
