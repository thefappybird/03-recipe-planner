<script setup lang="ts">
import TheCard from "@/components/TheCard.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "About | Plato",
  meta: [
    { name: "description", content: "Learn more about Plato" },
    { property: "og:title", content: "About | Plato" },
  ],
});
</script>

<template>
  <div class="about-grid">
    <section class="about">
      <h1>About Plato</h1>
      <h6>
        <span>Plato</span> is a recipe planner app that helps you log and create
        healthy meal plans.
      </h6>
    </section>
    <TheCard>
      <h3>Browse/Create Recipes Easily!</h3>
      <h6>
        Use <span>Plato</span> to browse recipes without any account creation!
        If you ever wanted to share your recipes to the
        <span>Plato</span> community, just Register with us to start sharing!
      </h6>
    </TheCard>
    <TheCard>
      <h3>What is Plato?</h3>
      <h6>
        <span>Plato</span> is a functional recipe planner app that is created as
        a part of my personal portfolio to showcase my skills in
        <span>Vue.js</span>, <span>TypeScript</span>, and <span>SCSS</span>. It
        is designed to help users plan their meals effectively while promoting
        healthy eating habits.
      </h6>
    </TheCard>
    <section class="about-image"></section>
  </div>
</template>

<style scoped lang="scss">
.about-grid {
  @include grid-type(repeat(2, 1fr), auto repeat(2, 1fr));
  margin: 1rem 0;
  @media (max-width: 425px) {
    @include grid-template(1fr, auto);
  }
  section {
    &:first-child {
      @include main-card;
      padding: min(3rem, 8%);
      @media (min-width: 768px) {
        grid-column: 1 / 3;
      }
    }
    &:last-child {
      grid-row: 3 / 4;

      @media (min-width: 768px) {
        grid-column: 2;
        grid-row: 2 / 4;
      }
    }
    &:not(:first-child) {
      padding: min(3.5rem, 8%);
    }
  }
}
.about-image {
  border: 1px solid black;
  @include greeting-image("about-img.jpg");
}
span {
  @include highlighted;
}
</style>
