<template>
  <div class="chart-container">
    <!-- 图表容器，ref 绑定，后续通过 chartRef 获取这个 DOM -->
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // 引入 Composition API
import * as echarts from 'echarts'; // 引入 ECharts 库

export default {
  name: 'DataChart',
  setup() {
    const chartRef = ref(null); // 用于绑定图表容器 DOM
    let myChart = null; // 保存 echarts 实例

    onMounted(() => {
      // 初始化 echarts 实例，挂载到 ref 对应的 DOM
      myChart = echarts.init(chartRef.value);

      // 图表配置项
      const option = {
        tooltip: {
          trigger: 'item' // 提示框触发类型（'item' 鼠标悬浮时显示数据）
        },
        legend: {
          top: '5%', // 图例距离容器顶部 5%
          left: 'center' // 图例水平居中
        },
        series: [
          {
            name: 'Access From', // 系列名称
            type: 'pie', // 图表类型：饼图
            radius: ['40%', '70%'], // 饼图半径（内半径40%，外半径70% → 圆环图）
            avoidLabelOverlap: false, // 避免标签重叠
            padAngle: 5, // 每个扇区之间的间隙角度
            itemStyle: {
              borderRadius: 10 // 扇区圆角大小
            },
            label: {
              show: false, // 默认隐藏标签
              position: 'center' // 标签显示在圆心（只有在 emphasis 下才显示）
            },
            emphasis: {
              // 高亮状态（鼠标悬停时）
              label: {
                show: true, // 高亮时显示标签
                fontSize: 20, // 字体大小
                fontWeight: 'bold' // 字体加粗
              }
            },
            labelLine: {
              show: false // 隐藏标签的引导线
            },
            // 图表数据
            data: [
              { value: 1048, name: 'Search Engine' }, // 搜索引擎
              { value: 735, name: 'Direct' }, // 直接访问
              { value: 580, name: 'Email' }, // 邮件
              { value: 484, name: 'Union Ads' }, // 联合广告
              { value: 300, name: 'Video Ads' } // 视频广告
            ]
          }
        ]
      };

      // 将配置项应用到图表实例
      myChart.setOption(option);

      // 监听窗口大小变化，自动调整图表尺寸
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    });

    // 将 chartRef 暴露给模板使用
    return { chartRef };
  }
};
</script>

<style scoped>
/* 外层容器 */
.chart-container {
  width: 100%; /* 宽度自适应父容器 */
  height: 600px; /* 高度固定 400px，可以根据需要修改 */
}

/* 图表实际绘制区域 */
.chart {
  width: 100%; /* 撑满容器 */
  height: 100%; /* 撑满容器 */
}
</style>
