<template>
  <div class="chart-container">
    <!-- 图表容器，ref 绑定 -->
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'; // 如果需要后端数据

export default {
  name: 'DataChart',
  setup() {
    const chartRef = ref(null);
    let myChart = null;

    // ===== 原始前端示例数据（可保留注释，方便切换） =====
    const localTableData = [
      { name: 'Alice', school: 'School A' },
      { name: 'Bob', school: 'School C' },
      { name: 'Charlie', school: 'School C' },
      { name: 'David', school: 'School D' },
      { name: 'Eve', school: 'School E' }
    ];

    // ===== 原始前端示例数据（直接给出数值，不计算数量） =====
    // 这里的 value 即为每个学校占比的权重
    // const localTableData = [
    //   { name: 'School A', value: 120 },
    //   { name: 'School B', value: 80 },
    //   { name: 'School C', value: 150 },
    //   { name: 'School D', value: 50 },
    //   { name: 'School E', value: 100 }
    // ];

    // ===== 后端数据（可切换使用） =====
    const backendTableData = ref([]);

    // ===== 工具函数：统计学校人数 =====
    const getSchoolCounts = (tableData) => {
      const map = {};
      tableData.forEach((item) => {
        if (item.school) map[item.school] = (map[item.school] || 0) + 1;
      });
      return Object.entries(map).map(([name, value]) => ({ name, value }));
    };

    // ===== 获取后端数据并更新图表 =====
    const fetchBackendData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/list');
        backendTableData.value = res.data;

        myChart.setOption({
          series: [{ data: getSchoolCounts(backendTableData.value) }]
        });
      } catch (err) {
        console.error('Failed to fetch backend data', err);
      }
    };

    onMounted(() => {
      myChart = echarts.init(chartRef.value);

      const option = {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [
          {
            name: 'Count',
            type: 'pie',
            radius: ['40%', '70%'], // 保留原始圆环效果
            avoidLabelOverlap: false,
            padAngle: 5, // 保留扇区间距
            itemStyle: { borderRadius: 10 },
            label: { show: false, position: 'center' },
            emphasis: {
              label: { show: true, fontSize: 20, fontWeight: 'bold' }
            },
            labelLine: { show: false },
            // ===== 默认显示前端数据统计后结果展示 =====
            data: getSchoolCounts(localTableData)

            // 直接使用数据展示 无需统计数量
            // data: localTableData
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });

      // ===== 如果希望使用前端数据，注释下面一行  数据源就会被修改 返回给前端数据=====
      // 默认使用的是前端数据 但是下面一行把数据源覆盖了 使用了后端数据
      fetchBackendData();
    });

    return { chartRef };
  }
};
</script>

<style scoped>
/* 保留原始样式设置 */
.chart-container {
  width: 100%;
  height: 600px; /* 可根据需要修改 */
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
