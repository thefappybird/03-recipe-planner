<script setup lang="ts">
import ProfileSidebar from "@/components/auth/profile/sidebar/ProfileSidebar.vue";
import DeleteConfirm from "@/components/auth/recipe/DeleteConfirm.vue";
import RecipeForm from "@/components/auth/recipe/RecipeForm.vue";
import TheModal from "@/components/TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();
const { toggleDeleteModal } = modalStore;
const { deleteModal } = storeToRefs(modalStore);
const { isFormDrawerOpen } = storeToRefs(modalStore);
</script>

<template>
  <div class="private-view">
    <ProfileSidebar />
    <RecipeForm v-if="isFormDrawerOpen" />
    <TheModal v-if="deleteModal" @toggleModal="toggleDeleteModal">
      <DeleteConfirm />
    </TheModal>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.private-view {
  display: flex;
  align-items: stretch; // ✅ sidebar grows along with router view
  min-height: 100vh; // ✅ ensures at least viewport height
  height: auto; // ✅ allows to grow beyond viewport
}
</style>
