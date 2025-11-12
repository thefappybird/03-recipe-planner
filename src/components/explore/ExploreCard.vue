<template>
  <div
    :class="props.index % 2 === 0 ? 'orig-color' : 'alt-color'"
    class="recipe-card"
  >
    <div class="title-section">
      <router-link
        :to="{
          name: isAuthenticated ? 'auth-recipe-details' : 'recipe-details',
          params: { recipeId: recipeId },
        }"
        class="title-btn"
      >
        <h3 class="title">{{ title }}</h3>
      </router-link>
      <p class="desc">
        by <span style="font-weight: 700">{{ authorUsername }}</span>
      </p>
      <p class="desc">{{ description }}</p>
      <!-- <StarRatings :averageRating="averageRating" /> -->
      <p v-if="frontTotalFavorites > 0" class="desc">
        Favorited by
        <span class="favorite-highlight">{{ frontTotalFavorites }}</span>
        <span v-if="frontTotalFavorites > 1"> users.</span>
        <span v-else> user.</span>
      </p>
    </div>

    <div
      class="recipe-image"
      :style="{
        backgroundImage: `url(${
          imageUrl ? imageUrl : '/src/assets/images/no-image.jpg'
        })`,
      }"
    ></div>
    <button
      class="favorite-btn"
      :class="{ favorited: frontFavoritedByCurrentUser }"
      @click.stop="onFavorite"
      aria-label="Toggle favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
         C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
         c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
import type { Recipe } from "@/types/interfaces";
// import StarRatings from "../icons/StarRatings.vue";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const favoriteStore = useFavoriteStore();
const userStore = useUserStore();

const { isAuthenticated } = storeToRefs(userStore);

const props = defineProps<{ recipe: Recipe; index: number }>();

const {
  recipeId,
  title,
  description,
  authorUsername,
  averageRating,
  imageUrl,
  totalFavorites,
  isFavoritedByCurrentUser,
} = props.recipe;
const emit = defineEmits<{
  (e: "toggle-favorite"): void;
}>();
const frontFavoritedByCurrentUser = ref(isFavoritedByCurrentUser);
const frontTotalFavorites = ref(totalFavorites);
async function onFavorite() {
  if (isAuthenticated) {
    if (frontFavoritedByCurrentUser.value === true) {
      favoriteStore.removeFavorites(recipeId);
      frontFavoritedByCurrentUser.value = false;
      frontTotalFavorites.value--;
    } else {
      favoriteStore.addFavorites(recipeId);
      frontFavoritedByCurrentUser.value = true;
      frontTotalFavorites.value++;
    }
  } else {
    emit("toggle-favorite");
  }
}
</script>

<style scoped lang="scss">
.recipe-card {
  @include flex-type(row, flex-start, stretch);
  align-items: stretch;
  padding: 1rem;
  gap: 0.5rem;
  margin: 0.5rem 0;
  position: relative; // for heart button later

  .title-section,
  .recipe-image {
    flex: 1;
  }

  .title-section {
    @include flex-type(column, flex-start, flex-start);
    width: 100%;
  }

  .recipe-image {
    width: 100%;
    background-size: cover;
    background-position: center;
  }
}
.favorite-btn {
  position: absolute;
  top: 1rem;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc;
  transition: transform 0.2s ease, color 0.2s ease;

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }

  &:hover {
    transform: scale(1.1);
  }

  &.favorited {
    color: #e91e63;
  }
}

.title-btn {
  text-decoration: none;
  transition: color 0.25s ease;
  &:hover {
    color: $light-green; // your accent color (example: green)
  }
  .title {
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: $light-green;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
}
.orig-color {
  @include main-card;
  .title-btn {
    &:hover {
      color: $highlight-green; // your accent color (example: green)
    }
  }
}
.alt-color {
  @include secondary-card;
}

@media (min-width: 768px) {
  .title {
    font-size: 1.5rem;
  }
  .desc {
    font-size: 1rem;
  }
}
</style>
