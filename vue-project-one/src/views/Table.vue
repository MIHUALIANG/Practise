<template>
  <div>
    <h2>User Information Table</h2>
    <el-table :data="tableData" stripe style="width: 100%" max-height="500">
      <el-table-column prop="date" label="Date" width="120" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="age" label="Age" width="120" />
      <el-table-column prop="school" label="School" width="120" />
      <el-table-column prop="birthday" label="Birthday" width="120" />
      <el-table-column prop="gender" label="Gender" width="120" />
    </el-table>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="danger" @click="clearTable">Clear Table</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

const store = useStore();

// 从store获取表格数据
const tableData = computed(() => {
  return store.state.tableData;
});

// 清空表格数据
const clearTable = () => {
  store.dispatch('clearTableData');
  ElMessage.success('Table data has been cleared');
};
</script>
