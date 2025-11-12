<template>
  <div class="login-form-wrapper">
    <h4>Login to Plato</h4>
    <p class="error" v-if="modalMessage">{{ modalMessage }}</p>
    <Form
      :validation-schema="schema"
      @submit="handleLogin"
      class="login-form"
      as="form"
    >
      <!-- Email -->
      <div class="form-group">
        <label for="loginIdentifier">Email/Username</label>
        <Field
          name="loginIdentifier"
          type="text"
          placeholder="Enter your Email/Username"
        />
        <ErrorMessage name="loginIdentifier" class="error" />
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
        {{ loadingState ? "Logging In..." : "Log In" }}
      </button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { storeToRefs } from "pinia";
import type { LoginUser } from "@/types/interfaces";
import { useModalStore } from "@/stores/modalStore";
import PasswordField from "../PasswordField.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const modalStore = useModalStore();
const userStore = useUserStore();

const { modalMessage } = storeToRefs(modalStore);
const { loadingState } = storeToRefs(userStore);

const { handleLogin } = userStore;

const schema = yup.object({
  loginIdentifier: yup.string().required("Email/Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
const passwordState = ref(false);
function togglePassword() {
  passwordState.value = !passwordState.value;
}
useForm<LoginUser>({
  validationSchema: schema,
  validateOnMount: false,
});
</script>

<style scoped lang="scss">
.login-form-wrapper {
  background: white;
  padding: 1rem;
  width: 300px;
  .form-group {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.75rem 0;

    label {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.5rem 2.5rem 0.5rem 0.75rem; // space for toggle button
      border: 1px solid #ccc;
      font-size: 1rem;

      &:focus {
        border-color: #4caf50;
        outline: none;
      }
    }
  }

  .error {
    color: #d9534f;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
  .submit-btn {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #4caf50;
    color: white;
    font-weight: 600;
    border: none;

    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: #45a049;
    }

    &:disabled {
      background-color: #9e9e9e;
      cursor: not-allowed;
    }
  }

  .back {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.2rem 0.4rem;
    color: #2c3e50;
    background-color: transparent;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(2px);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
