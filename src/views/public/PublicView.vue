<script setup lang="ts">
import LoginForm from "@/components/auth/LoginForm.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheModal from "@/components/TheModal.vue";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import { RouterView } from "vue-router";

const modalStore = useModalStore();

const { loginModal } = storeToRefs(modalStore);

const { toggleLoginModal } = modalStore;
watchEffect(() => {
  if (loginModal.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>
<template>
  <RouterView />
  <TheFooter />
  <TheModal v-if="loginModal" @toggleModal="toggleLoginModal">
    <LoginForm />
  </TheModal>
</template>
