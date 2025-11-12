<template>
  <section class="greeting-section">
    <div class="greeting-text slide-animation">
      <h1>Fuel Your Health With a Healthy <span>Plato</span></h1>
      <div>
        <p>
          <span>Plato</span> is a recipe planner app that helps you log and
          create healthy meal plans. It is never too late to start being mindful
          of your health; and <span>Plato</span> is a good place to start.
        </p>
        <p>
          Can't wait to get started? Click the button below to create your
          account and start planning your meals today!
        </p>
        <button class="common-btn"><h5>Start Now</h5></button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.greeting-section {
  @include greeting-image("main-bg.jpg");
  height: 90vh;
  padding: 1.5rem;
}
.greeting-text {
  @include flex-type(column, center);
  background-color: $color-background-main;
  height: fit-content;
  width: 100%;
  padding: 2rem;
  box-shadow: $greeting-shadow;

  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 1024px) {
    width: 60%;
  }
  @media (min-width: 1440px) {
    padding-right: 20%;
  }
}

.greeting-section {
  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
  @media (min-width: 1440px) {
    padding: 3rem;
  }
  div {
    @include flex(column);
    gap: 1rem;

    span {
      @include highlighted;
    }
    button {
      width: 50%;
    }
  }
}
</style>
