<template>
  <div class="password-field">
    <div class="password-slot">
      <slot></slot>
    </div>
    <button
      class="toggle-password"
      type="button"
      @click="$emit('toggle-password')"
    >
      <Transition name="fade-scale" mode="out-in">
        <svg
          v-if="passwordState"
          key="hide"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Edit / Hide">
            <path
              id="Vector"
              d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>

        <svg
          v-else
          key="show"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ passwordState: boolean }>();
const emit = defineEmits<{
  (e: "toggle-password"): void;
}>();
</script>

<style scoped lang="scss">
.password-slot {
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 100%;
}
.password-field {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
}
.toggle-password {
  background: none;
  border: none;
  width: fit-content;
  cursor: pointer;
  color: #777;
  font-size: 1rem;

  &:hover {
    color: #333;
  }
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.1s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
</style>
