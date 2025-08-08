<template>
  <div class="home">
    <el-container class="container">
      <!-- 左侧部分 导航栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
        <div class="logo-container">
          <img class="logo" src="../assets/logo.png" alt="" />
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
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="/about">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-menu-item index="2">
            <el-icon><Star /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧部分 -->
      <el-container>
        <el-header>
          <el-button
            class="collapse-btn"
            icon="Menu"
            @click="toggleCollapse"
            circle
          >
          </el-button>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
              homepage
            </el-breadcrumb-item>
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Location, Star, ArrowRight } from '@element-plus/icons-vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  setup() {
    const router = useRouter();
    const isCollapse = ref(false); // 是否折叠
    const activeIndex = ref(''); // 当前激活菜单项

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

    return {
      handleClose,
      handleOpen,
      handleSelect,
      toggleCollapse,
      isCollapse,
      activeIndex
    };
  }
};
</script>
