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
	@Prop(Object) chartData!: any;
	@Prop(String) chartType!: string;

	get chartHeight() {
		return `${document.body.offsetHeight * 0.7}px`;
	}

	get chartWidth() {
		return `${document.body.offsetWidth * 0.8}px`;
	}

	drawChart() {
		let chart = echarts.init(this.$refs.chart as HTMLCanvasElement);
		if (chart === undefined) {
			console.log("echarts init dom is failed");
			return;
		}
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
					type: "line",
					smooth: true
				}
			]
		};
		chart.setOption({
			...option,
			tooltip: {
				trigger: "axis"
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			}
		});
	}

	mounted() {
		this.drawChart();
	}
}
</script>
<style lang="scss" scoped>
.chart {
	width: 100%;
	// height: 600px;
}
</style>
