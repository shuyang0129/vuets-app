<template>
  <div class="charts-data">
    <el-tabs type="border-card" v-model="tabPosition">
      <el-tab-pane label="折线图" name="line">
        <Chart :chartData="chartData" chartType="line"></Chart>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <Chart :chartData="chartData" chartType="bar"></Chart>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <Chart :chartData="chartData" chartType="pie"></Chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";

@Component({
  components: { Chart }
})
export default class ChartsData extends Vue {
  tabPosition: string = "line";
  chartData = {
    xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yAxis: [820, 932, 901, 934, 1290, 1330, 1320]
  };
}
</script>
