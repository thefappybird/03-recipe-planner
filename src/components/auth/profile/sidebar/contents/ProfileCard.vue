<template>
  <div class="profile-card">
    <div class="profile-controls">
      <p class="username">{{ currentUser?.username }}</p>
      <button
        class="logout-btn"
        @click="userStore.handleLogout()"
        title="Logout"
      >
        <svg
          class="logout-icon"
          viewBox="0 0 32 31"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"
          ></path>
        </svg>
      </button>
    </div>
    <button @click="onCreateRecipe" class="new-recipe">Create Recipe</button>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modalStore";
import { useRecipeStore } from "@/stores/recipeStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
const modalStore = useModalStore();
const recipeStore = useRecipeStore();
const { toggleIsInteracting } = recipeStore;
const { isInteracting } = storeToRefs(recipeStore);
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

function onCreateRecipe() {
  toggleIsInteracting("");
  modalStore.toggleFormDrawer(true);
}
</script>

<style scoped lang="scss">
.profile-card {
  @include flex-type(column, space-between, center);
  width: 100%;
  max-width: 300px;
  border-bottom: $color-text solid 1px;

  @media (max-width: 768px) {
    margin-left: 0.75rem;
    border-bottom: none;
  }
  .profile-controls {
    @include flex-type(row, space-between, center);
    width: 100%;
    .username {
      margin-top: 0.4rem;
      font-weight: bold;
    }
    .logout-btn {
      background-color: transparent;
      .logout-icon {
        fill: $color-text;
        width: 1rem;
        height: 1rem;
      }
    }
  }
  .new-recipe {
    @include flex-type(row, center, center);
    padding: 0.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: $color-background-secondary;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s, color 0.3s;
    &:hover {
      @include main-card();
    }
  }
}
</style>
