<template>
  <div>
    <!-- 面包屑导航 -->
    <break-crumb :text="['统计', '数据']"></break-crumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 1000px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import BreakCrumb from 'components/content/BreakCrumb'
// 1. 导入echarts
import * as echarts from 'echarts'
import { getReportData } from 'network/report'

export default {
  components: {
    BreakCrumb,
  },
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
    }
  },
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 4. 准备数据和配置项
    const { data } = await getReportData()
    if (data.meta.status !== 200)
      return this.$message.error('获取折线图数据失败!')
    // 合并数据
    Object.assign(this.options, data.data)

    // 5. 使用刚指定的配置项和数据显示图表
    myChart.setOption(this.options)
  },
}
</script>

<style>
</style>