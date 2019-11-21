<template>
  <div class="charts-data">
    <el-tabs type="border-card" v-model="chartType">
      <el-tab-pane label="折线图" name="line">
        <Chart :chartData="chartData" chartType="line"></Chart>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">柱状图</el-tab-pane>
      <el-tab-pane label="饼图" name="pie">饼图</el-tab-pane>
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
  chartType: string = "line";
  chartData = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    }
  };
}
</script>
