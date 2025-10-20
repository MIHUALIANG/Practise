<template>
  <div class="nav">
    <el-icon class="nav-icon"><Tickets /></el-icon>
    <span>//</span>

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/about' }">
        Navigator
      </el-breadcrumb-item>
      <el-breadcrumb-item> More </el-breadcrumb-item>
      <el-breadcrumb-item>Our Service</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="home">
    <div class="service">
      <el-card class="card-1" shadow="hover">
        <template #header>Yummy hamburger</template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%"
        />
      </el-card>
      <el-card class="card-2" shadow="hover">
        <template #header>Yummy hamburger</template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%"
        />
      </el-card>
      <el-card class="card-3" shadow="hover">
        <template #header>Yummy hamburger</template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%"
        />
      </el-card>
      <el-card class="card-4" shadow="hover">
        <template #header>Yummy hamburger</template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%"
        />
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
</script>
