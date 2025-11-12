import type { Toast } from "@/types/interfaces";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  function addToast(message: string, type: Toast["type"] = "info") {
    const id = Date.now();
    let toastMessage = message;
    if (!message) {
      switch (type) {
        case "success":
          toastMessage = "Success!";
          break;
        case "error":
          toastMessage = "An error occurred.";
          break;
        case "info":
          toastMessage = "Information.";
          break;
        case "warning":
          toastMessage = "Warning!";
          break;
        default:
          type = "info";
      }
    }
    toasts.value.push({ id, message: toastMessage, type });

    // auto remove after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }
  return { toasts, addToast, removeToast };
});
