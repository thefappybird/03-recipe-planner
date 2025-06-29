<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <h2>Plato</h2>
      <div class="links">
        <router-link to="/home" active-class="active-links"
          ><h4>Home</h4></router-link
        >
        <router-link to="/about" active-class="active-links"
          ><h4>About</h4></router-link
        >
        <router-link to="/blog" active-class="active-links"
          ><h4>Blog</h4></router-link
        >
        <router-link to="/contact" active-class="active-links"
          ><h4>Contact</h4></router-link
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-background-header);
  color: var(--color-text-header);
  padding: 1rem 2rem;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.links {
  display: flex;
  gap: 1rem;
  color: var(--color-text-header);
}
.active-links {
  color: var(--highlight-green);
}

@media (max-width: 375px) {
  header {
    padding: 1rem;
  }
  .links {
    gap: 0.5rem;
  }
}
@media (max-width: 320px) {
  header {
    padding: 0.75rem;
  }
  .links {
    gap: 0.25rem;
  }
}
</style>
