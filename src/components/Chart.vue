<template>
  <div class="chart" ref="chart" :style="{width: chartWidth,height: chartHeight}"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts from "echarts";

@Component({
  components: {}
})
export default class Charts extends Vue {
  @Prop(Object) readonly chartData!: any;
  @Prop(String) chartType!: string;

  get chartHeight() {
    return `${document.body.offsetHeight * 0.7}px`;
  }

  get chartWidth() {
    return `${document.body.offsetWidth * 0.8}px`;
  }

  mounted() {
    this.drawChart();
  }

  drawChart() {
    let chart = echarts.init(this.$refs.chart as HTMLCanvasElement);
    if (chart === undefined) {
      console.log("echarts init dom is failed");
      return;
    }
    switch (this.chartType) {
      case "line":
        chart.setOption((this as any).generatorLineOption());
        break;
      case "bar":
        chart.setOption((this as any).generatorBarOption());
        break;
      case "pie":
        chart.setOption((this as any).generatorPieOption());
        break;
      default:
        console.log(`chartType ${this.chartType} is invalid`);
        break;
    }
  }

  generatorLineOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: this.chartData.xAxis
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: this.chartData.yAxis,
          type: "line",
          smooth: true
        }
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      }
    };
  }

  generatorBarOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: this.chartData.xAxis
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: this.chartData.yAxis,
          type: "bar",
          barWidth: "20%"
        }
      ],
      color: ["#3898DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      }
    };
  }

  generatorPieOption() {
    const data = [] as any;
    for (const index in this.chartData.xAxis) {
      data.push({
        value: this.chartData.yAxis[index],
        name: this.chartData.xAxis[index]
      });
    }
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: this.chartData.xAxis
      },
      yAxis: {
        type: "value"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: this.chartData.xAxis
      },
      series: [
        {
          data,
          type: "pie",
          smooth: true
        }
      ],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      }
    };
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  // height: 600px;
}
</style>
