<template>
  <el-button
    class="collapse-btn"
    icon="Menu"
    @click="$emit('toggleCollapse')"
    circle
  ></el-button>

  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      Dropdown List
      <el-icon class="el-icon--right"><arrow-down /> </el-icon>
      <el-avatar class="avatar" :src="avatarImg" />
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
</template>

<script setup>
import avatarImg from '../assets/zz.jpg';
</script>
