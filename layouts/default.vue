<template>
  <div class="layout">
    <Sidebar push open>
      <template #header="{ toggle, open }">
        <div class="header right">
          <VButton
            hoverfill
            icon="double_arrow"
            onlyicon
            round
            @click="toggle()"
            class="sidebar-opener"
            :class="{ open }"
          ></VButton>
        </div>
      </template>
      <template #body="{ select, open, isSelected }">
        <div class="body">
          <span v-for="(item, index) in buttons" :key="index">
            <VButton
              v-if="!item.divider"
              hoverfill
              listitem
              :icon="item.icon"
              @click="click(index, item, select)"
              :onlyicon="!open"
              :selected="
                (isSelected(index) && subSelected[1] === -1) ||
                (subSelected[0] === index && subSelected[1] !== -1)
              "
              :clickable="
                item.sub && !(subSelected[0] === index && subSelected[1] !== -1)
              "
              :href="item.href"
              :righticon="item.sub ? 'expand_more' : ''"
              style="--padding-hor: 20px"
              :class="{ subexpand: item.subopen }"
              >{{ item.title }}</VButton
            >
            <div
              v-if="item.dividerlinetop"
              class="sidebar-divider-line"
              :class="{ open }"
            ></div>
            <div v-if="item.divider" class="sidebar-divider" :class="{ open }">
              <h2>{{ item.title }}</h2>
            </div>
            <div
              v-if="item.dividerline"
              class="sidebar-divider-line"
              :class="{ open }"
            ></div>
            <ListAccordion
              v-if="item.sub"
              :open="item.subopen && open"
              :count="item.sub.length"
              :contract="!open"
            >
              <VButton
                v-for="(subitem, index1) in item.sub"
                link
                @click="subClick(index, index1, item)"
                :href="subitem.href"
                :selected="
                  subSelected[0] === index && subSelected[1] === index1
                "
                >{{ subitem.title }}</VButton
              >
            </ListAccordion>
          </span>
        </div>
      </template>
      <template #footer>
        <div class="footer radius">
          <div class="radius-before"></div>
          <div class="radius-after"></div>
          <VButton
            hoverfill
            icon="double_arrow"
            onlyicon
            round
            class="sidebar-opener"
          ></VButton>
        </div>
      </template>
      <!-- 
      <template #submenu>
        <Sidebar v-for="num in [3, 4]" submenu :open="subSelected[0] === num">
          <template #header>
            <div class="header left">
              <VButton
                hoverfill
                icon="arrow_back"
                onlyicon
                round
                @click="subUnselect()"
              ></VButton>
              <div class="submenu-title">Updates</div>
            </div>
          </template>
          <template #body="{ select, isSelected }">
            <div class="body submenu">
              <VButton
                v-for="(item, index) in buttonlist[num]"
                :key="index"
                hoverfill
                textleft
                listitem
                @click="click(index, item, select)"
                :selected="isSelected(index)"
                :href="item.href"
                >{{ item.title }}</VButton
              >
            </div>
          </template>
        </Sidebar>
      </template> -->
    </Sidebar>
    <div class="inner">
      <!--
      <nav class="navbar">
        <VButton link class="navlink" href="/" tabindex="0">About Us</VButton>
        <VButton link class="navlink" href="/price" tabindex="0">Projects</VButton>
        <VButton link class="navlink" tabindex="0">Contact</VButton>
        <TextField class="navlink" placeholder="Search" icon="search" round />
      </nav>
      -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnimatedStore } from '@/stores/animated';

const animated_store = useAnimatedStore();

const buttonlist = [
  [
    {
      title: 'Listele',
      href: '/dashboard/teacherinfo',
    },
    {
      title: 'Ekle',
      href: '/dashboard/teacheradd',
    },
  ],
  [
    {
      title: 'Third',
    },
    {
      title: 'Fourth',
    },
  ],
] as Partial<ListButton>[][];

const buttons = ref([
  {
    divider: true,
    title: 'MENU',
  },
  {
    title: 'Ana Ekran',
    icon: 'home',
    href: '/dashboard',
  },
  {
    title: 'Öğretmen Bilgileri',
    icon: 'search',
    sub: buttonlist[0],
  },
  {
    title: 'Puantaj İşlemleri',
    icon: 'campaign',
    sub: buttonlist[1],
  },
  {
    title: 'Maaş Değişiklik',
    icon: 'inventory_2',
    href: '/test',
  },
  {
    dividerlinetop: true,
    divider: true,
    title: 'OTHERS',
  },
  {
    title: 'İstatistik',
    icon: 'show_chart',
    click: () => {
      useAnimatedStore().toggle();
    },
  },
  {
    title: 'Ödeme ve Abonelik',
    icon: 'wallet',
    href: '/price',
  },
  {
    title: 'İdare Yönetim',
    icon: 'group',
    href: '/price',
  },
] as Partial<ListButton>[]);

const subSelected = ref([-1, -1]);
const subUnselect = () => {
  subSelected.value[0] = -1;
};

const click = (
  index: number,
  item: Partial<ListButton>,
  selectFunc: (index: number, callback: (() => void) | undefined) => void,
) => {
  if (item.sub) {
    // if (subSelected.value[0] === index) {
    //   subUnselect();
    //   return;
    // }

    if (
      item.subopen &&
      !(subSelected.value[0] === index && subSelected.value[1] !== -1)
    ) {
      item.subopen = false;
      return;
    }

    //subSelected.value[0] = index;
    item.subopen = true;
    return;
  }

  buttons.value[subSelected.value[0]].subopen = false;
  subSelected.value[0] = index;
  selectFunc(index, item.click);
};

const subClick = (
  index0: number,
  index1: number,
  item: Partial<ListButton>,
) => {
  if (subSelected.value[0] !== -1 && subSelected.value[0] !== index0)
    buttons.value[subSelected.value[0]].subopen = false;

  subSelected.value[0] = index0;
  subSelected.value[1] = index1;

  //item.subopen = true;
};
</script>

<style scoped lang="scss">
.sidebar-divider {
  h2 {
    font-weight: 800;
    color: var(--background-color-3);
    font-size: 13px;
  }

  .animated & {
    transition: 0.3s;
  }

  max-height: 40px;
  max-width: 100px;
  opacity: 1;
  margin-top: 10px;
  margin-bottom: 10px;

  user-select: none;

  &:not(.open) {
    max-height: 0;
    max-width: 0;
    opacity: 0;
    margin: 0;
  }
}

.sidebar-divider-line {
  height: 2px;
  background: var(--background-color-2);
}

.layout {
  display: flex;
  height: 100vh;
}

.inner {
  flex: 1;
  overflow: auto;
}

.sidebar-opener.open:deep(.icon) {
  transform: rotateZ(180deg);
}

.subexpand:deep(.righticon) {
  transform: rotateZ(-180deg);
}

.submenu-title {
  margin-left: 15px;
  font-weight: 600;
  font-size: 1.2rem;
}

.header {
  display: flex;
  align-items: center;

  &.left {
    justify-content: flex-start;
  }

  &.right {
    justify-content: flex-end;
  }
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  row-gap: 10px;
}

.footer {
  background: var(--background-color-2);
}

.footer.radius {
  position: relative;

  --radius: 20px;

  .radius-before {
    position: absolute;
    top: calc(var(--radius) * -2);
    right: 0;
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    background: transparent;

    border-bottom-right-radius: var(--radius);

    box-shadow: 0 var(--radius) 0 0 var(--background-color-2);

    pointer-events: none;
  }

  .radius-after {
    position: absolute;
    top: calc(var(--radius) * -2);
    left: 0;
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    background: transparent;

    border-bottom-left-radius: var(--radius);

    box-shadow: 0 var(--radius) 0 0 var(--background-color-2);

    pointer-events: none;
  }
}

.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  border-bottom: 2px solid #aaa;

  padding-right: 50px;
  padding-left: 50px;
}

.navlink {
  margin: 20px 30px;
}
</style>
