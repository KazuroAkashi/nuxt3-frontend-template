<template>
  <div class="textfield-wrapper" :class="props">
    <input
      :id="id"
      type="text"
      class="textfield-input"
      :placeholder="
        $props.icon || !$props.underlined ? $props.placeholder : ' '
      "
      @input="
        {
          emit('input');
        }
      "
    />
    <label :for="id" class="textfield-icon">
      <!-- <i :class="$props.icon"></i> -->
      <span class="material-icons" aria-hidden="true">{{ $props.icon }}</span>
    </label>
    <div class="underline" v-if="$props.underlined"></div>
    <div class="dynplaceholder" v-if="!$props.icon && $props.underlined">
      {{ $props.placeholder }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid';

const id = v4();

const props = defineProps({
  placeholder: String,
  icon: String,
  round: Boolean,
  underlined: Boolean,
});

const emit = defineEmits(['input']);
</script>

<style scoped lang="scss">
$textfield-bg: var(--background-color-2);
.textfield-wrapper {
  position: relative;
  display: flex;

  &.underlined::before {
    content: '';

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;

    background: $textfield-bg;
  }
}

.textfield-input {
  user-select: text;

  position: relative;

  flex: 1;

  font-size: 14px;

  padding: 10px 10px 10px 50px;
  border-radius: 3px;

  transition: 0.3s;

  outline: none;
  border: none;

  background: $textfield-bg;
  color: color-contrast($textfield-bg);

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  .round & {
    border-radius: 100vmin;
  }

  .underlined & {
    background: transparent;
    box-shadow: none;
  }

  .textfield-wrapper:not(.icon) > & {
    padding-left: 5px;
  }
}

.textfield-icon {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;

  padding-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    transition: 0.3s;
  }

  .textfield-wrapper:not(.icon) > & {
    display: none;
  }

  .textfield-input:focus ~ & > span {
    color: var(--primary-color);
    text-shadow: 0 0 10px var(--primary-color);
  }

  .underlined > & {
    padding-left: 0;
  }
}

.underline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;

  background: rgba(var(--primary-color), 0.7);

  transform: scaleX(0);

  transition: 0.15s;

  .textfield-input:focus ~ &,
  .textfield-input:not(:placeholder-shown) ~ & {
    transform: scaleX(1);
  }
}

.dynplaceholder {
  pointer-events: none;

  position: absolute;
  left: 5px;
  bottom: 0;

  transform: translateY(-50%);
  transform-origin: -10px -100%;

  color: var(--foreground-color-3);

  transition: 0.15s;

  .textfield-input:focus ~ &,
  .textfield-input:not(:placeholder-shown) ~ & {
    transform: translateY(-50%) scale(0.5);
    color: var(--primary-color);
  }
}
</style>
