<script setup lang="ts">
import { useModalStore } from "@/stores/modalStore";
import { onBeforeUnmount, onMounted, ref } from "vue";
const modalStore = useModalStore();
const userStore = useUserStore();
const dropdownRef = ref<HTMLElement | null>(null);
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";

const { choiceModal } = storeToRefs(modalStore);
const { toggleDrawer, toggleChoiceModal, toggleLoginModal } = modalStore;

const handleClickOutside = (event: MouseEvent) => {
  // if clicked outside the dropdown, close it
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    toggleChoiceModal(false);
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));

onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);
</script>

<template>
  <header class="header-footer">
    <nav>
      <div class="title-header">
        <button class="toggle-btn" @click="toggleDrawer">
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
        <h2>Plato</h2>
      </div>

      <div v-if="!userStore.isAuthenticated" class="links">
        <router-link to="/home" active-class="active-links"
          ><h5>Home</h5></router-link
        >
        <router-link to="/about" active-class="active-links"
          ><h5>About</h5></router-link
        >
        <router-link to="/explore" active-class="active-links"
          ><h5>Explore</h5></router-link
        >
        <div class="dropdown-wrapper" ref="dropdownRef">
          <button type="button" @click="toggleChoiceModal()">
            <svg
              class="icon"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1,9h14V7H1V9z M1,14h14v-2H1V14z M1,2v2h14V2H1z" />
            </svg>
          </button>
          <div v-if="choiceModal" class="dropdown-modal">
            <button class="dropdown-item" @click="toggleLoginModal()">
              Login
            </button>
            <router-link
              to="/register"
              @click="toggleChoiceModal()"
              class="dropdown-item"
              >Register</router-link
            >
          </div>
        </div>
      </div>
      <div class="links" v-else>
        <router-link to="/auth/explore" active-class="active-links"
          ><h5>Explore</h5></router-link
        >
        <router-link to="/auth/favorites" active-class="active-links"
          ><h5>Favorites</h5></router-link
        >
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
nav {
  @include flex-type(row, space-between);
  .title-header {
    @include flex-type(row, null, center);
  }
}
.toggle-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: $color-text-header;
  }
}
.links {
  @include flex-type(row, null, center);
  gap: clamp(1.25%, 1rem, 2.5vw);
  color: $color-text-header;
  .active-links {
    color: $highlight-green;
    cursor: not-allowed;
  }
  .dropdown-wrapper {
    position: relative; /* anchors the modal to the button */
    display: inline-block;
    .dropdown-modal {
      position: absolute;
      top: calc(100% + 0.5rem); /* place below button */
      right: 0; /* align right edge */
      min-width: 160px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      padding: 0.5rem;
      z-index: 50;
      animation: fadeIn 0.2s ease;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .dropdown-item {
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
        border-radius: 0.25rem;
        cursor: pointer;
        color: #333;
        transition: background 0.2s, color 0.2s;
        &:hover {
          background-color: #f5f5f5;
          color: #ffb400;
        }
      }
    }
  }
  button {
    background-color: transparent;
    .icon {
      fill: $color-text-header;
      width: 2rem;
      height: 2rem;
      /* makes it scale with its container */
      max-width: 100%;
      max-height: 100%;
      @media (max-width: 600px) {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
}

/* optional responsive scaling */

header {
  padding: 0.5rem 1.5rem;
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
  }
  @media (max-width: 375px) {
    padding: 1rem;
  }
  @media (max-width: 320px) {
    padding: 0.75rem;
  }
}
</style>
