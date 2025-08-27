<template>
  <div class="chart-container">
    <!-- 图表容器，ref 绑定 -->
    <div ref="pieChartRef" class="piechart"></div>

    <!-- 新增堆叠面积图容器，ref 绑定 -->
    <div ref="lineChartRef" class="linechart"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'; // 如果需要后端数据

export default {
  name: 'DataChart',
  setup() {
    const pieChartRef = ref(null);
    let pieChart = null;

    const lineChartRef = ref(null); // 新增堆叠面积图 ref
    let lineChart = null; // 堆叠面积图实例

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

        pieChart.setOption({
          series: [{ data: getSchoolCounts(backendTableData.value) }]
        });
      } catch (err) {
        console.error('Failed to fetch backend data', err);
      }
    };

    onMounted(() => {
      pieChart = echarts.init(pieChartRef.value);

      const pieOption = {
        tooltip: {
          trigger: 'item', // 鼠标悬停到扇区时显示
          formatter: '{b} : {c} ({d}%)' // b=名称, c=数值, d=百分比，a=name(此时为Count)
        },
        legend: { top: '15%', left: 'center' },
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

      pieChart.setOption(pieOption);
      window.addEventListener('resize', () => {
        pieChart.resize();
      });

      // ===== 如果希望使用前端数据，注释下面一行  数据源就会被修改 返回给前端数据=====
      // 默认使用的是前端数据 但是下面一行把数据源覆盖了 使用了后端数据
      fetchBackendData();

      // ===== 初始化堆叠面积图 =====
      lineChart = echarts.init(lineChartRef.value);

      const lineOption = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
          // 可以添加下载功能
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
          },
          {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
          },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
          },
          {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
          },
          {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 191, 0)'
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
          }
        ]
      };

      lineChart.setOption(lineOption);

      // ===== 响应式处理 =====
      window.addEventListener('resize', () => {
        lineChart.resize();
      });
    });

    return { pieChartRef, lineChartRef };
  }
};
</script>

<style scoped>
/* 保留原始样式设置 */
.chart-container {
  width: 100%;
  height: 600px; /* 可根据需要修改 */
}
.piechart {
  width: 30%;
  height: 100%;
  margin-bottom: 30px;
  float: left;
}
.linechart {
  width: 70%;
  height: 100%;
  margin-bottom: 30px;
  float: left;
}
</style>
