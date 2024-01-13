<template>
  <nav class="navbar" ref="nav">
    <Button
      v-for="button in $props.buttons"
      type="link"
      class="navlink"
      :href="button.href"
      :icon="button.icon"
      :righticon="button.sub ? 'expand_more' : undefined"
      tabindex="0"
      :href-selected="button.sub ? button.sub.filter(obj => obj.href).map(obj => obj.href!) : true"
      clickable-when-selected
      >{{ button.title }}

      <template v-if="button.sub" #submenu="{ hovered }">
        <Accordion :open="hovered" class="accordion">
          <Button
            v-for="subbtn in button.sub"
            type="link"
            :href="subbtn.href"
            :icon="subbtn.icon"
            href-selected
            >{{ subbtn.title }}</Button
          >
        </Accordion>
      </template>
    </Button>
    <TextField
      v-if="$props.search"
      class="navlink"
      placeholder="Search"
      icon="search"
      underlined
    />
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  buttons: ListButton[];
  search?: boolean;
}>();

const nav = ref() as Ref<HTMLElement>;
const navHeight = defineModel('navHeight');

onMounted(() => {
  navHeight.value = nav.value.clientHeight;
});
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  // border-bottom: 2px solid #aaa;

  background-color: var(--background-color-r1);
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.6);

  padding-right: 50px;
  padding-left: 50px;
}

.navlink {
  margin: 15px 30px;
  position: relative;
}

.accordion {
  cursor: default;

  --padding: 10px 30px 10px 15px;
  background: var(--background-color-r2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: absolute;

  top: 100%;
  left: -2px;

  z-index: 50;
}
</style>
