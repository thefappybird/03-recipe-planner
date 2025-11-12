<template>
  <div class="register-container">
    <div class="register-form-wrapper">
      <button class="back" @click="goBack">
        <p>Back</p>
      </button>
      <h2>Create an Account</h2>

      <Form
        :validation-schema="schema"
        @submit="handleRegister"
        class="register-form"
        as="form"
      >
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" placeholder="Enter your email" />
          <ErrorMessage name="email" class="error" />
        </div>

        <!-- Username -->
        <div class="form-group">
          <label for="username">Username</label>
          <Field
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          <ErrorMessage name="username" class="error" />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <PasswordField
            @toggle-password="togglePassword"
            :passwordState="passwordState"
          >
            <Field
              name="password"
              :type="passwordState ? 'text' : 'password'"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" class="error" />
          </PasswordField>
        </div>

        <button type="submit" class="submit-btn" :disabled="loadingState">
          <span v-if="loadingState" class="loader"></span>
          {{ loadingState ? "Registering..." : "Register" }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import router from "@/router";
import * as yup from "yup";
import type { RegisterUser } from "@/types/interfaces";
import { storeToRefs } from "pinia";
import PasswordField from "@/components/PasswordField.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const { loadingState } = storeToRefs(userStore);

const { handleRegister } = userStore;
const passwordState = ref(false);
function togglePassword() {
  passwordState.value = !passwordState.value;
}
// ✅ Validation schema using Yup
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number"),
});

useForm<RegisterUser>({
  validationSchema: schema,
  validateOnMount: false,
});

function goBack() {
  router.push({ name: "home" });
}
</script>

<style scoped lang="scss">
/* Centering wrapper */
.register-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center; /* horizontally center */
  align-items: center; /* vertically center */
  min-height: 100vh; /* full screen height */
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
}

/* Form card */
.register-form-wrapper {
  position: relative;
  background: #fff;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  font-family: "Inter", sans-serif;
}
.back {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.2rem 0.4rem;
  color: $dark-green;
  background-color: transparent;
  &:hover {
    background-color: #d1c0c0;
  }
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: $dark-green;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.loader {
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  display: inline-block;
  margin-right: 0.5rem;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
/* Input and validation styles */
.form-group {
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  input {
    width: 100%;
    padding: 0.65rem 0.8rem;
    border: 1.5px solid #ccc;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    &:focus {
      outline: none;
      border-color: $highlight-green;
      box-shadow: 0 0 0 2px rgba(143, 155, 124, 0.212);
    }
  }

  .valid-input {
    border-color: #22c55e; /* green */
  }

  .invalid-input {
    border-color: #ef4444; /* red */
  }

  .error {
    font-size: 0.85rem;
    color: #ef4444;
    margin-top: 0.25rem;
  }
}

/* Submit button */
.submit-btn {
  background-color: $dark-green;
  color: white;
  font-weight: 600;
  border: none;
  padding: 0.8rem;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: $highlight-green;
    color: $dark-green;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* Make sure it's nice on mobile */
@media (max-width: 480px) {
  .register-form-wrapper {
    padding: 1.5rem;
  }
}
</style>
