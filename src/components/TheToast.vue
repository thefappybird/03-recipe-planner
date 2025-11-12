<script setup lang="ts">
import { useToastStore } from "@/stores/toastStore";

const toastStore = useToastStore();

const getToastColor = (type?: string) => {
  switch (type) {
    case "success":
      return "#4caf50";
    case "error":
      return "#f44336";
    case "warning":
      return "#ff9800";
    default:
      return "#2196f3";
  }
};
</script>

<template>
  <div class="toast-container">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast"
      :style="{ borderLeftColor: getToastColor(toast.type) }"
    >
      <span>{{ toast.message }}</span>
      <button class="close" @click="toastStore.removeToast(toast.id)">×</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2000;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-left: 4px solid #2196f3;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem;
  min-width: 250px;
  animation: slideIn 0.3s ease;
  font-size: 0.9rem;

  .close {
    background: none;
    border: none;
    color: #666;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 0.5rem;

    &:hover {
      color: #000;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
