<template>
  <div v-if="currentRecipe" class="recipe-page">
    <div class="recipe-section">
      <div class="recipe-details">
        <div class="title-edit-container">
          <h1>{{ currentRecipe.title }}</h1>
          <button
            v-if="isAuthor"
            class="edit"
            @click="onEditClick"
            title="Edit Recipe"
          >
            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Complete">
                <g id="edit">
                  <g>
                    <path
                      d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                      fill="none"
                      stroke="#374b27"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />

                    <polygon
                      fill="none"
                      points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                      stroke="#374b27"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <button
            v-if="isAuthor"
            class="delete"
            @click="onDeleteClick"
            title="Delete Recipe"
          >
            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg
              viewBox="0 -0.5 21 21"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-179.000000, -360.000000)"
                  fill="#374b27"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                      id="delete-[#1487]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <p>By: {{ currentRecipe.authorUsername }}</p>
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
          <div class="ingredients-section title-name">
            <p class="ingredient-name"><span>•</span> {{ ingredient.name }}</p>
          </div>
          <div class="ingredients-section amount-units">
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
        <p class="title">Step {{ step.stepNumber }}</p>
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
import { useUserStore } from "@/stores/userStore";
const modalStore = useModalStore();
const recipeStore = useRecipeStore();
const userStore = useUserStore();

const { currentUser } = storeToRefs(userStore);

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

const isAuthor = computed(() => {
  if (!currentUser.value || !currentRecipe.value) return false;
  return currentUser.value.username === currentRecipe.value.authorUsername;
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

useHead(
  computed(() => ({
    title: (currentRecipe.value?.title ?? "Recipe Not Found") + " | Plato",
    meta: [
      {
        name: "description",
        content:
          (currentRecipe.value?.title ?? "Recipe Not Found") + " | Plato",
      },
      {
        property: "og:title",
        content:
          (currentRecipe.value?.title ?? "Recipe Not Found") + " | Plato",
      },
    ],
  }))
);
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
      h1 {
        margin-right: 1rem;
      }
      button {
        background-color: transparent;
        height: 35px;
        width: 35px;
        transition: all 0.2s ease; // smooth transition for hover

        &:hover {
          color: white; // text/icon color change
          transform: scale(1.1); // slight zoom effect
        }

        &:active {
          transform: scale(0.95); // press-down effect
        }
      }
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
  gap: 1rem;
  border-bottom: 1px solid black;
  padding: 0.5rem 0;
  .title {
    font-weight: bold;
    text-wrap: nowrap;
  }
}

.ingredients-container {
  display: grid;
  grid-template-rows: repeat(5, min-content); // 5 rows per column
  grid-auto-flow: row; // Fill items column-first
  width: fit-content;
  min-width: 250px;
  .ingredients-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }
  .amount-units {
    justify-content: flex-end;
  }
  .title-name {
    p {
      font-weight: bold;
      text-wrap: nowrap;
      span {
        margin-right: 0.3rem;
        font-size: larger;
      }
    }
  }
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
