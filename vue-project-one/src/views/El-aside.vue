<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
    <div class="logo-container">
      <img class="logo" src="../assets/logo.png" alt="logo" />
      <transition name="el-fade-in-linear">
        <span v-show="!isCollapse">LOGO</span>
      </transition>
    </div>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator</span>
        </template>
        <el-menu-item-group title="Our Information">
          <el-menu-item index="/about">About us</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="About You">
          <el-menu-item index="/information">Information</el-menu-item>
          <el-menu-item index="/table">Table</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu>
          <template #title>More</template>
          <el-menu-item index="/service">Our Service</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-menu-item index="/data">
        <el-icon><Star /></el-icon>
        <span>Data Center</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Privacy Data</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Setting</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const route = useRoute();

const isCollapse = ref(false);
const activeIndex = ref(route.path);

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const handleSelect = (index) => {
  router.push(index);
  activeIndex.value = index;
};

const handleOpen = (key, keyPath) => {
  console.log('open:', key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log('close:', key, keyPath);
};

watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath;
  },
  { immediate: true }
);

defineExpose({
  toggleCollapse,
  isCollapse
});
</script>
