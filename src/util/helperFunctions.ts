import api from "@/services/api";
import { useToastStore } from "@/stores/toastStore";
import { AxiosError } from "axios";

export const transformToFormData = (
  data: any,
  formData = new FormData(),
  parentKey = ""
) => {
  for (const key in data) {
    if (data[key] === null || data[key] === undefined) continue;

    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (data[key] instanceof File) {
      // Append files normally
      formData.append(fullKey, data[key]);
    } else if (Array.isArray(data[key]) || typeof data[key] === "object") {
      // Convert arrays and nested objects to JSON string
      formData.append(fullKey, JSON.stringify(data[key]));
    } else {
      // Append primitive values
      formData.append(fullKey, data[key]);
    }
  }
  return formData;
};

export const postRequest = async (url: string, data: any) => {
  const formData = transformToFormData(data);
  console.log([...formData.entries()]);

  return await api.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const handleError = (error: any) => {
  const toastStore = useToastStore();

  if (error instanceof AxiosError) {
    toastStore.addToast(error.response?.data, "error");
  } else if (error instanceof Error) {
    toastStore.addToast(error.message, "error");
  } else {
    throw error;
  }
};

export function getInputValue(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
  return target ? target.value : "";
}
