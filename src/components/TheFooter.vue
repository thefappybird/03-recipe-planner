<template>
  <footer class="header-footer">
    <h2>
      Plato by
      <a href="https://github.com/thefappybird" target="_blank"
        >Alexander A. Banaag III</a
      >
    </h2>
    <h6>{{ contactNum }}</h6>
    <h6>{{ email }}</h6>
  </footer>
</template>
<script>
  const contactNum = import.meta.env.VITE_CONTACT_NUM;
  const email = import.meta.env.VITE_EMAIL;
</script>
<style scoped lang="scss">
footer {
  @include flex-type(column, flex-start, flex-start);
  padding: 1rem 2rem;
}
</style>
