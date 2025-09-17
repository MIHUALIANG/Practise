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
          <el-menu-item index="/setting">
            <el-icon><setting /></el-icon>
            <span>Setting</span>
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

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              Dropdown List
              <el-icon class="el-icon--right"><arrow-down /> </el-icon>
              <el-avatar class="avatar" :src="avatarImg" />
              <!-- <img class="avatar" src="../assets/zz.jpg" /> -->
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="A">
                  <el-icon><Plus /></el-icon>Action 1
                </el-dropdown-item>

                <el-dropdown-item command="B">
                  <el-icon><CirclePlusFilled /></el-icon>Action 2
                </el-dropdown-item>

                <el-dropdown-item command="C">
                  <el-icon><CirclePlus /></el-icon>Action 3
                </el-dropdown-item>

                <el-dropdown-item command="D">
                  <el-icon><Check /></el-icon>Action 4
                </el-dropdown-item>

                <el-dropdown-item command="E">
                  <el-icon><CircleCheck /></el-icon>Action 5
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <container>
          <el-main> <router-view></router-view> </el-main>
        </container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
// 组件引用

import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import avatarImg from '../assets/zz.jpg';
// import { ElMessage } from 'element-plus';
import { ElNotification } from 'element-plus';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  setup() {
    const router = useRouter();
    const route = useRoute(); // ✅ 正确获取当前路由
    const isCollapse = ref(false); // 是否折叠
    const activeIndex = ref('/about'); // 当前激活菜单项

    const handleCommand = (command) => {
      ElNotification(`Click On Item ${command}`);
    };
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    const handleSelect = (index) => {
      router.push(index);
      // 跳转路由
      activeIndex.value = index;
      // 改变 acticeIndex
    };

    watch(
      () => route.path, // 监听 route.path
      (newPath) => {
        activeIndex.value = newPath; // 同步左侧菜单高亮
      },
      { immediate: true } // 初始化时也同步
    );

    // 仅用于调试菜单展开/关闭
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
      handleCommand,
      toggleCollapse,
      isCollapse,
      activeIndex,
      ArrowRight,
      avatarImg
    };
  }
};
</script>
