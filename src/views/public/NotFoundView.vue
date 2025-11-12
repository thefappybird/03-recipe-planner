<template>
  <div class="notfound-container">
    <div class="notfound-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn’t exist or may have been moved.</p>

      <div class="actions">
        <RouterLink to="/" class="btn btn-home">🏠 Go Home</RouterLink>
        <button class="btn btn-back" @click="goBack">← Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.notfound-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  text-align: center;
  flex-direction: column;
  padding: 1.5rem;
}

.notfound-content {
  max-width: 480px;
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 6rem;
  font-weight: 700;
  color: #4caf50;
  margin-bottom: 0.25rem;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-home {
  background-color: #4caf50;
  color: white;
}

.btn-home:hover {
  background-color: #45a049;
}

.btn-back {
  background-color: transparent;
  border: 1px solid #4caf50;
  color: #4caf50;
}

.btn-back:hover {
  background-color: #e8f5e9;
}
</style>
