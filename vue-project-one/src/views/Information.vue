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
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">
              homepage
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'about/' }"
              >promotion management</el-breadcrumb-item
            >
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>

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

        <el-main>
          <div class="el-main">
            <div class="mainstyle">
              <span class="title">Name: </span>
              <el-input
                v-model="inputname"
                style="width: 240px"
                placeholder="Please input your name"
              />
            </div>
            <div class="mainstyle">
              <span class="title">Age: </span>
              <el-input
                v-model="inputage"
                style="width: 240px"
                placeholder="Please input your age"
              />
            </div>
            <div class="mainstyle">
              <span class="title">School: </span>
              <el-select
                v-model="value"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>

            <div class="mainstyle">
              <span class="title">Birthday: </span>
              <el-date-picker
                v-model="datevalue"
                type="datetime"
                placeholder="Select date and time"
                :shortcuts="shortcuts"
              />
            </div>
            <div class="mainstyle">
              <span class="title">Gender: </span>
              <el-radio-group v-model="gender">
                <el-radio value="1" size="larger">Male</el-radio>
                <el-radio value="2" size="larger">Female</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
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
    const activeIndex = ref(''); // 当前激活菜单项
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
