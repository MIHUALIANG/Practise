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
              <span>Navigator One</span>
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

          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Dropdown List
              <el-icon class="el-icon--right"><arrow-down /> </el-icon>
              <el-avatar class="avatar" :src="avatarImg" />
              <!-- <img class="avatar" src="../assets/zz.jpg" /> -->
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><Plus /></el-icon>Action 1
                </el-dropdown-item>

                <el-dropdown-item>
                  <el-icon><CirclePlusFilled /></el-icon>Action 2
                </el-dropdown-item>

                <el-dropdown-item>
                  <el-icon><CirclePlus /></el-icon>Action 3
                </el-dropdown-item>

                <el-dropdown-item>
                  <el-icon><Check /></el-icon>Action 4
                </el-dropdown-item>

                <el-dropdown-item>
                  <el-icon><CircleCheck /></el-icon>Action 5
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>

        <container>
          <el-main> <router-view></router-view> </el-main
        ></container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
// 组件引用

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import avatarImg from '../assets/zz.jpg';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  setup() {
    const router = useRouter();
    const isCollapse = ref(false); // 是否折叠
    const activeIndex = ref('/about'); // 当前激活菜单项
    const datevalue = ref('');
    const gender = ref('1');
    const inputname = ref('');
    const inputage = ref('');
    const value = ref('');

    const options = [
      {
        value: 'NJUPT',
        label: 'NJUPT'
      },
      {
        value: 'THU',
        label: 'THU'
      },
      {
        value: 'NKU',
        label: 'NKU'
      },
      {
        value: 'NJU',
        label: 'NJU'
      },
      {
        value: 'BIT',
        label: 'BIT'
      }
    ];

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

    const shortcuts = [
      {
        text: 'Today',
        value: new Date()
      },
      {
        text: 'Yesterday',
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date;
        }
      },
      {
        text: 'A week ago',
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() - 7);
          return date;
        }
      }
    ];

    return {
      handleClose,
      handleOpen,
      handleSelect,
      toggleCollapse,
      isCollapse,
      activeIndex,
      ArrowRight,
      avatarImg,
      shortcuts,
      datevalue,
      gender,
      inputname,
      inputage,
      value,
      options
    };
  }
};
</script>
