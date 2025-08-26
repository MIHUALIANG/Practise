<template>
  <div class="nav">
    <el-icon class="nav-icon"><Tickets /></el-icon>
    <span>//</span>

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/about' }">
        Navigator
      </el-breadcrumb-item>
      <el-breadcrumb-item>About You</el-breadcrumb-item>
      <el-breadcrumb-item>Table</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="home">
    <h2>User Information Table</h2>

    <!-- ===== 当前显示后端 JSON 数据 ===== -->
    <el-table
      :data="backendTableData"
      stripe
      style="width: 100%"
      max-height="400"
    >
      <el-table-column prop="date" label="Date" width="120" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="age" label="Age" width="120" />
      <el-table-column prop="tel" label="Tel" width="120" />
      <el-table-column prop="school" label="School" width="120" />
      <el-table-column prop="birthday" label="Birthday" width="120" />
      <el-table-column prop="gender" label="Gender" width="120" />
    </el-table>

    <!-- ===== 保留原来前端数据表格形式（可切换使用） ===== -->
    <!--
    <el-table :data="frontendTableData" stripe style="width: 100%" max-height="500">
      <el-table-column prop="date" label="Date" width="120" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="age" label="Age" width="120" />
      <el-table-column prop="tel" label="Tel" width="120" />
      <el-table-column prop="school" label="School" width="120" />
      <el-table-column prop="birthday" label="Birthday" width="120" />
      <el-table-column prop="gender" label="Gender" width="120" />
    </el-table>
    -->

    <div class="button-clear" style="margin-top: 20px">
      <el-button type="danger" @click="clearTable">Clear Table</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

const store = useStore();

// ===== 后端 JSON 数据表 =====
const backendTableData = ref([]);

// 从后端获取 JSON 数据
const fetchBackendData = async () => {
  try {
    const res = await axios.get('http://localhost:3000/list');
    backendTableData.value = res.data;
  } catch (err) {
    console.error(err);
    ElMessage.error('Failed to fetch table data from backend');
  }
};

// ===== 前端数据表格（保留注释，可切换使用） =====
const frontendTableData = ref([]); // 从 Vuex / 前端获取数据
onMounted(() => {
  // 如果想切换到前端数据表格，取消注释：
  // frontendTableData.value = store.state.tableData;

  // 默认使用后端 JSON 数据
  fetchBackendData();
});

// 清空表格数据（同时清空 JSON 文件）
const clearTable = async () => {
  try {
    await axios.post('http://localhost:3000/clear');
    backendTableData.value = [];
    ElMessage.success('Table data has been cleared');
  } catch (err) {
    console.error(err);
    ElMessage.error('Failed to clear table data');
  }
};
</script>
