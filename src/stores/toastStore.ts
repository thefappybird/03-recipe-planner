import type { Toast } from "@/types/interfaces";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  function addToast(message: string, type: Toast["type"] = "info") {
    const id = Date.now();
    toasts.value.push({ id, message, type });

    // auto remove after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }
  return { toasts, addToast, removeToast };
});
