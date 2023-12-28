<template>
  <div
    class="checkbox"
    :style="{ '--left': $props.left + 'px', '--vert': $props.vert + 'px' }"
  >
    <input :id="id" type="checkbox" class="checkbox-input" v-model="checked" />
    <label :for="id" class="checkbox-display"></label>
    <div class="checkbox-ball"></div>
  </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid';

const id = v4();

const props = defineProps({
  modelValue: Boolean,
  left: {
    type: Number,
    default: 3,
  },
  vert: {
    type: Number,
    default: 2,
  },
});
const emit = defineEmits(['update:modelValue']);

const checked = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  --width: 48px;
  --height: 24px;
}

.checkbox-input {
  display: none;
}

.checkbox-display {
  padding: calc(var(--height) / 2) calc(var(--width) / 2);

  flex: 1;

  height: 100%;

  background-color: var(--background-color-2);

  border-radius: 100vmin;

  transition: 0.3s;

  cursor: pointer;

  .checkbox-input:checked ~ & {
    background-color: var(--primary-color);
    box-shadow: 0 0 15px var(--primary-color);
  }
}
.checkbox-ball {
  pointer-events: none;

  background-color: var(--foreground-color-2);

  aspect-ratio: 1;
  z-index: 1;

  position: absolute;
  left: var(--left);
  top: var(--vert);
  bottom: var(--vert);

  border-radius: 50%;

  transition: 0.3s;
  .checkbox-input:checked ~ & {
    left: calc(100% - var(--left));
    transform: translateX(-100%);
  }
}
</style>
