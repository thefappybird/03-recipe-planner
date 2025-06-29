<script setup lang="ts"></script>

<template>
  <section class="greeting-section">
    <div class="greeting-text">
      <h1>Fuel Your Health With a Healthy <span class="title">Plato</span></h1>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nisi
          reiciendis obcaecati repellendus explicabo sit unde cum praesentium
          nulla. Totam corrupti molestias, rerum culpa rem iusto consequatur
          dolore libero asperiores.
        </p>
        <button class="common-btn cta"><h5>Start Now</h5></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.greeting-section {
  background-image: url("../../assets/main-bg.jpg");
  background-repeat: no-repeat;
  background-position: 80% center; /* keeps image centered */
  background-attachment: fixed; /* optional parallax effect */
  background-size: cover; /* fills container, may crop */
  height: 90vh;
  padding: 1.5rem;
}
.greeting-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-background-main);
  height: fit-content;
  width: 100%;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}

.greeting-section div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cta {
  width: 50%;
}

.title {
  color: var(--light-green);
}
@media (min-width: 768px) {
  .greeting-text {
    width: 80%;
  }
}

@media (min-width: 1024px) {
  .greeting-section {
    padding: 2.5rem;
  }
  .greeting-text {
    width: 60%;
  }
}

@media (min-width: 1440px) {
  .greeting-section {
    padding: 3rem;
  }
  .greeting-text {
    padding-right: 20%;
  }
}
</style>
