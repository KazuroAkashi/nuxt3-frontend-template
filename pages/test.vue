<template>
  <div class="page">
    <main class="main">
      <a class="test" @click="hello">{{ counterStore.doubleCounter }}</a>
      <a class="test" @click="$HelloService().changeText">Change Text</a>
      <a class="test">{{ $BackendService().pullData() }}</a>
      <div class="sometext">{{ text }}</div>
      <VButton @click="hello" borderfill>Click me!</VButton>
      <VButton link href="/">About Us</VButton>
    </main>

    <div class="box">
      <VButton full round bg class="kopbtn" @click="kopkop()">Kopkop</VButton>

      <VButton full round bg class="bir-baska-btn">Başka bir buton</VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Ref } from 'vue';
import { useTestStore } from '@/stores/test';

const { $HelloService, $BackendService } = useNuxtApp();

const counterStore = useTestStore();

const text = $HelloService().helloText();

// const count: Ref<number> = ref(1);

const hello = () => {
  // count.value++;
  counterStore.increment();
};

const kopkop = () => {
  console.log('testo');
};
</script>

<style scoped lang="scss">
.bir-baska-btn {
  --bg: url('https://t3.ftcdn.net/jpg/02/79/05/18/360_F_279051882_eh8garW76Qzgdxyq0BwPLJBy49s5maoG.jpg');
  margin-left: 20px;
}
.page,
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  color: var(--foreground-color);
}

.page {
  flex-direction: column;
}

.test {
  user-select: none;
  text-decoration: none;
  padding: 10px 20px;

  margin: 10px;

  border: 2px solid var(--primary-color);
  border-radius: 5px;

  color: #eee;

  transition: 0.3s;

  &:hover {
    background: var(--primary-color);
    box-shadow: 0 0 6px 3px rgba(var(--primary-color), 0.5);
  }
}
</style>
