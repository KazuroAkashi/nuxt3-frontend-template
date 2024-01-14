<template>
  <Body
    :class="{
      animated: animated_store.animated,
      'dark-theme': darktheme_store.darktheme,
      touchscreen: useIsTouchscreen(),
    }"
  >
    <div class="loading-overlay" v-show="loading">
      <Icon icon="pending" />
      <h1>Loading...</h1>
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script setup lang="ts">
import { useAnimatedStore, useDarkthemeStore } from '@/stores/options';

const animated_store = useAnimatedStore();
const darktheme_store = useDarkthemeStore();

const loading = ref(true);

onMounted(async () => {
  await nextTick();
  loading.value = false;
});

interface CustomElement extends HTMLElement {
  clickOutsideEvent: (e: MouseEvent) => any;
}

const app = useNuxtApp();
app.vueApp.directive('click-outside', {
  mounted(element, binding, vnode) {
    const el = element as CustomElement;

    el.clickOutsideEvent = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value.call(vnode.appContext, event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

if (
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  darktheme_store.turnon();
}

if (
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion)').matches
) {
  animated_store.turnoff();
}
</script>

<style lang="scss">
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  column-gap: 6px;

  background: var(--background-color);

  z-index: 9999;
}
</style>
