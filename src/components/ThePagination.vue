<template>
  <div class="pagination">
    <button
      class="page-btn"
      type="button"
      @click="onChangePage({ page: props.currentPage - 1 })"
      :disabled="currentPage == 1"
    >
      Previous
    </button>
    <h3>{{ currentPage }}</h3>
    <button
      class="page-btn"
      type="button"
      @click="onChangePage({ page: props.currentPage + 1 })"
      :disabled="currentPage == totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  onChangePage: (filter: { page: number }) => void;
}>();
</script>

<style scoped lang="scss">
.pagination {
  @include flex-type(row, center, center);
  gap: 1rem;
  height: fit-content;
  margin-bottom: 0.5rem;
}
.page-btn {
  @include color-set($lightest-green, $dark-green);
  font-weight: bold;
  padding: 0.2rem 1rem;
  border: 1px solid $dark-green;
  width: 95px;
}
</style>
