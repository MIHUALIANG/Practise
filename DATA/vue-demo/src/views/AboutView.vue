<template>
  <div class="nav">
    <el-icon class="nav-icon"><Tickets /></el-icon>
    <span>//</span>

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }"> Navigator </el-breadcrumb-item>
      <el-breadcrumb-item>Our Information</el-breadcrumb-item>
      <el-breadcrumb-item>About us</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="home">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
</script>
