<template>
  <div
    class="accordion"
    :class="classes"
    ref="acc"
    :style="{ '--max-height': maxHeight + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  open?: boolean;
}>();

const forceOpen = ref(true);

const classes = computed(() => ({
  open: props.open || forceOpen.value,
  testing: forceOpen.value,
}));

const acc = ref() as Ref<HTMLElement>;
const elCount = useSlots().default?.().length ?? 0;
const maxHeight = ref(1);

onMounted(() => {
  maxHeight.value = acc.value.clientHeight;
  forceOpen.value = false;
});
</script>

<style scoped lang="scss">
.accordion {
  --padding: 5px 5px;
  --row-gap: 5px;
  box-sizing: content-box;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: var(--row-gap);

  overflow: hidden;

  .animated & {
    transition: 0.3s;
  }

  &:not(.testing) {
    max-height: 0;
    padding: var(--padding);
    padding-bottom: 0;
    padding-top: 0;
    &.open {
      max-height: var(--max-height);
      padding: var(--padding);
    }
  }
}

.accordion.open:deep(.btn) {
  transform: translateY(0);
  opacity: 1;
  pointer-events: initial;
  max-width: 1000px;
}

.accordion:deep(.btn) {
  transform: translateY(-20px);
  opacity: 0;
  pointer-events: none;
  max-width: 0;
}
</style>