<template>
  <div class="skeleton-card">
    <div class="skeleton-content">
      <div class="skeleton-line short"></div>
      <div class="skeleton-line long"></div>
      <div class="skeleton-line short"></div>
    </div>
    <div class="skeleton-img"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-card {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 150px;
  padding: 1rem;
  gap: 1rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
}

.skeleton-img,
.skeleton-line {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 37%, #e0e0e0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton-img {
  width: 50%;
  height: 100%;
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .skeleton-line.short {
    width: 50%;
    height: 16px;
  }

  .skeleton-line.long {
    width: 90%;
    height: 12px;
  }
}

@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
</style>
