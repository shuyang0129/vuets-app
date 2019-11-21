<template>
  <div class="chart" ref="chart"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts from "echarts";

@Component({
  components: {}
})
export default class Charts extends Vue {
  @Prop(Object) chartData!: any;
  @Prop(String) chartType!: string;

  drawChart() {
    let chart = echarts.init(this.$refs.chart as HTMLCanvasElement);
    let option: any = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };
    chart.setOption(option);
  }

  mouted() {
    this.drawChart();
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 200px;
  height: 200px;
}
</style>
