<template>
  <Body
    :class="{
      animated: animated_store.animated,
      'dark-theme': darktheme_store.darktheme,
      touchscreen: useIsTouchscreen(),
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script setup lang="ts">
import { useAnimatedStore, useDarkthemeStore } from '@/stores/options';

const animated_store = useAnimatedStore();
const darktheme_store = useDarkthemeStore();

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
