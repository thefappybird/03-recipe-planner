<template>
  <div class="profile-layout">
    <!-- Sidebar Drawer -->
    <transition name="slide">
      <div v-if="isDrawerOpen" class="profile-sidebar drawer">
        <div class="drawer-header">
          <button class="drawer-btn" @click="toggleDrawer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ProfileCard />
        </div>
        <UserRecipes />
      </div>
    </transition>

    <!-- Default sidebar (desktop) -->
    <div class="profile-sidebar desktop">
      <ProfileCard />
      <UserRecipes />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileCard from "./contents/ProfileCard.vue";
import UserRecipes from "./contents/UserRecipes.vue";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();

const { isDrawerOpen } = storeToRefs(modalStore);
const { toggleDrawer } = modalStore;
</script>

<style scoped lang="scss">
.profile-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 220px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    height: fit-content;
    width: 0;
  }
}

.profile-sidebar {
  @include flex-type(column, flex-start, flex-start);
  gap: 0.5rem;
  border-right: 1px solid $dark-green;
  padding: 0.5rem;
  flex: 1;

  .drawer-header {
    @include flex-type(row, space-between, center);
    width: 100%;
  }
  &.desktop {
    flex: 1; // Makes it fill available space
    width: 100%;

    height: 100%;
  }

  &.drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 75%;
    max-width: 300px;
    background-color: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .drawer-btn {
      background: none;
      border: none;
      padding: 0;
      svg {
        width: 2rem;
        height: 2rem;
        color: #333;
      }
    }
  }
}

/* Drawer transition animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Responsive behavior */
@media (max-width: 768px) {
  .profile-sidebar.desktop {
    display: none;
  }

  .toggle-btn {
    display: block;
  }
}
</style>
