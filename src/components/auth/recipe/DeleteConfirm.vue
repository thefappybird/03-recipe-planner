<template>
  <div class="delete-wrapper">
    Are you sure you want to delete this recipe?
    <div class="btn-container">
      <button type="button" class="confirm-delete-btn" @click="deleteRecipe">
        Yes, Delete
      </button>
      <button type="button" class="cancel-delete-btn" @click="onCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modalStore";
import { useRecipeStore } from "@/stores/recipeStore";
const modalStore = useModalStore();
const recipeStore = useRecipeStore();
const { deleteRecipe, toggleIsInteracting } = recipeStore;

function onCancel() {
  toggleIsInteracting("");
  modalStore.toggleDeleteModal(false);
}
</script>

<style scoped lang="scss">
.delete-wrapper {
  background: white;
  padding: 0.3rem 1rem;
  width: 350px;
  text-align: center;
  .btn-container {
    @include flex-type(row, center, center);
    margin-top: 1rem;
    gap: 1rem;
    .confirm-delete-btn,
    .cancel-delete-btn {
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
      font-weight: bold;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .confirm-delete-btn {
      background-color: #e74c3c;
      color: white;
      &:hover {
        background-color: #c0392b;
      }
    }
    .cancel-delete-btn {
      background-color: #bdc3c7;
      color: black;
      &:hover {
        background-color: #95a5a6;
      }
    }
  }
}
</style>
