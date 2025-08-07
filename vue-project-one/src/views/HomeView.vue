<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <el-container class="container">
      <!-- 左侧部分 导航栏 -->
      <el-aside class="aside">
        <div class="logo-container">
          <p>LOGO</p>
        </div>
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>

            <el-menu-item-group>
              <template #title>
                <span class="group">Group One</span>
              </template>
              <el-menu-item index="/about">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template #title>
                <span class="group">Group Two</span>
              </template>
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>

            <el-sub-menu index="1-4">
              <template #title> item four</template>
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
        <!-- 右侧 head部分 -->
        <el-header>Header</el-header>

        <!-- 右侧 main部分 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  setup() {
    const router = useRouter();
    const handleSelect = (index) => {
      router.push(index); // 跳转到对应路由
    };

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleClose,
      handleOpen,
      handleSelect
    };
  }
};
</script>
