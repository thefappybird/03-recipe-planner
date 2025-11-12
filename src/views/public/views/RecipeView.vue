<template>
  <div v-if="currentRecipe" class="recipe-page">
    <div class="recipe-section">
      <div class="recipe-details">
        <div class="title-edit-container">
          <h1>{{ currentRecipe.title }}</h1>
          <button @click="onEditClick">Edit</button>
          <button @click="onDeleteClick">delete</button>
        </div>
        <p>By: {{ currentRecipe.authorUsername }}</p>
        <p>
          {{ currentRecipe.averageRating }}
          <span class="star"> ★</span>
        </p>
        <p v-if="currentRecipe.totalFavorites > 0">
          Favorited by {{ currentRecipe.totalFavorites }}
          <span v-if="currentRecipe.totalFavorites > 1"> users.</span>
          <span v-else> user.</span>
        </p>
        <p>{{ currentRecipe.description }}</p>
      </div>
      <img
        :src="imageUrl ? imageUrl : '/src/assets/images/no-image.jpg'"
        :alt="currentRecipe.title"
        class="imageUrl"
      />
    </div>
    <div class="recipe-section ingredients">
      <h3>Ingredients</h3>
      <div class="ingredients-container">
        <div
          class="array-list"
          v-for="(ingredient, index) in currentRecipe.ingredients"
          :key="index"
        >
          <div class="array-section">
            <p class="ingredient-count">{{ index + 1 }}.</p>
            <p>{{ ingredient.name }}</p>
          </div>
          <div class="array-section">
            <p>{{ ingredient.amount }}</p>
            <p>{{ ingredient.units }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recipe-section steps">
      <h3>Steps</h3>
      <div
        class="array-section"
        v-for="(step, index) in currentRecipe.steps"
        :key="index"
      >
        <p>Step {{ step.stepNumber }}</p>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, computed, ref, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/stores/recipeStore";
import type { Recipe } from "@/types/interfaces";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modalStore";
import { useHead } from "@vueuse/head";
const modalStore = useModalStore();
const recipeStore = useRecipeStore();
const route = useRoute();

const currentRecipe = ref<Recipe | null>(null);

const recipeId = computed(() => route.params.recipeId as string);
const { isEditing } = storeToRefs(recipeStore);

const imageUrl = computed((): string | undefined => {
  if (!currentRecipe.value) return undefined;
  if (!currentRecipe.value.imageUrl) return undefined;

  // If it's a File object, create a temporary URL
  if (currentRecipe.value.imageUrl instanceof File) {
    return URL.createObjectURL(currentRecipe.value.imageUrl);
  }

  // If it's already a string URL, return it directly
  if (typeof currentRecipe.value.imageUrl === "string") {
    return currentRecipe.value.imageUrl;
  }

  return undefined;
});
function onEditClick() {
  modalStore.toggleFormDrawer(true);
  recipeStore.toggleIsInteracting(recipeId.value);
}
function onDeleteClick() {
  recipeStore.toggleIsInteracting(recipeId.value);
  modalStore.toggleDeleteModal(true);
}
onMounted(async () => {
  currentRecipe.value = await recipeStore.getRecipeById(recipeId.value);
});

// 👇 This makes it reactive to route changes
watch(recipeId, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    currentRecipe.value = await recipeStore.getRecipeById(newId);
  }
});

watch(isEditing, async () => {
  if (isEditing.value === false) {
    // Ensure still on the same route and recipeId exists

    if (route.name === "auth-recipe-details" && recipeId.value) {
      currentRecipe.value = await recipeStore.getRecipeById(recipeId.value);
    }
  }
});

onBeforeUnmount(() => {
  if (currentRecipe.value?.imageUrl instanceof File) {
    URL.revokeObjectURL(imageUrl.value as string);
  }
});

useHead({
  title: currentRecipe.value
    ? currentRecipe.value.title + " | Plato"
    : "Recipe Not Found | Plato",
  meta: [
    {
      name: "description",
      content: currentRecipe.value
        ? currentRecipe.value.description || "Delicious recipe on Plato."
        : "The page you are looking for does not exist.",
    },
    {
      property: "og:title",
      content: currentRecipe.value
        ? currentRecipe.value.title + " | Plato"
        : "Recipe Not Found | Plato",
    },
  ],
});
</script>

<style scoped lang="scss">
.recipe-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.recipe-section {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #ccc;

  .recipe-details {
    width: 100%;
    .star {
      color: #d4a538;
    }
    .title-edit-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  .array-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    padding: 0 0.4rem;
  }
}
.ingredients,
.steps {
  flex-direction: column;
}
.array-section {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  .ingredient-count {
    font-weight: bold;
  }
}
.ingredients-container {
  display: grid;
  grid-template-rows: repeat(5, min-content); // 5 rows per column
  grid-auto-flow: column; // Fill items column-first
  width: fit-content;
  @media (max-width: 768px) {
    grid-template-rows: repeat(auto-fill, min-content);
    grid-auto-flow: row; // Flow row-first on smaller screens
    grid-template-columns: repeat(2, 1fr); // Max 2 columns
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; // Single column on tiny screens
    grid-template-rows: none; // Let rows auto-fill
  }
}

.imageUrl {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.loading {
  text-align: center;
  margin-top: 2rem;
}
</style>
