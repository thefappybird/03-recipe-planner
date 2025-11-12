<template>
  <div class="explore-header">
    Explore Our Top Recipes
    <form class="search-form" @submit.prevent="handleSearch">
      <input type="text" placeholder="Search Recipes..." v-model="searchText" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");

const { onSearch } = defineProps<{
  onSearch?: (filter: { title: string } | null) => void;
}>();

function handleSearch() {
  if (onSearch) {
    onSearch(searchText.value ? { title: searchText.value } : null);
  }
}
</script>

<style scoped lang="scss">
.explore-header {
  @include flex-type(column, flex-start, flex-start);
  padding: 1rem 2rem;
  background-color: $lightest-green;
  color: $color-text;
  font-size: large;
  margin: 0.5rem 0;
  @media (min-width: 768px) {
    font-size: x-large;
    @include flex-type(row, space-between, center);
  }
  .search-form {
    @include flex-type(row, center);
    margin-top: 1rem;
    gap: 0.5rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }
    input {
      padding: 0.5rem;
      border: none;
      border-radius: 5px;
      width: 100%;
    }
    button {
      border-radius: 5px;
      padding: 0.5rem 1rem;
      background-color: $highlight-green;
      &:hover {
        background-color: $light-green;
        color: white;
      }
    }
  }
}
</style>
