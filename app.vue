<template>
  <div :class="{ animated: animated_store.animated }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAnimatedStore } from '@/stores/animated';

const animated_store = useAnimatedStore();

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
  document.body.classList.add('dark-theme');
}
</script>
