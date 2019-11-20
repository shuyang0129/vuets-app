<template>
	<el-dialog
		width="50%"
		title="编辑课程"
		:visible.sync="dialogVisible"
		:close-on-click-modal="false"
		:show-close="false"
	>
		<el-form
			class="form-box"
			:model="dialogData"
			:rules="rules"
			label-position="left"
			label-width="100px"
			size="small"
			ref="ruleForm"
		>
			<el-form-item label="课程名称" prop="title" class="el-input">
				<el-input type="text" v-model="dialogData.title" auto-complete="off" placeholder="请输入课程名称"></el-input>
			</el-form-item>
			<el-form-item label="课程等级" prop="level">
				<el-select class="el-select" v-model="dialogData.level" placeholder="请选择课程等级">
					<el-option label="初级" value="初级"></el-option>
					<el-option label="中级" value="中级"></el-option>
					<el-option label="高级" value="高级"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="报名人数" prop="count" class="el-input">
				<el-input type="text" v-model="dialogData.count" auto-complete="off" placeholder="请输入报名人数"></el-input>
			</el-form-item>
			<el-form-item label="上线时间" prop="date">
				<el-date-picker
					v-model="dialogData.date"
					type="date"
					placeholder="选择日期"
					value-format="yyyy-MM-dd"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="技术栈" prop="type">
				<el-radio-group v-model="dialogData.type">
					<el-radio label="vue" name="type"></el-radio>
					<el-radio label="react" name="type"></el-radio>
					<el-radio label="node" name="type"></el-radio>
					<el-radio label="小程序" name="type"></el-radio>
					<el-radio label="angular" name="type"></el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="closeModal" size="small">取 消</el-button>
			<el-button type="primary" @click="submitForm('ruleForm')" size="small">确 定</el-button>
		</span>
	</el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as Interface from "@/models/interface";
import { AxiosResponse } from "axios";
import { Form } from "element-ui";

@Component({
	components: {}
})
export default class Home extends Vue {
	@Prop(Boolean) dialogVisible!: boolean;
	@Prop(Object) dialogData!: Interface.IDialogData;
	rules = {
		title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
		level: [{ required: true, message: "请选择课程等级", trigger: "change" }],
		count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
		date: [
			{
				required: true,
				type: "string",
				message: "请选择日期",
				trigger: "change"
			}
		],
		type: [{ required: true, message: "请选择技术栈", trigger: "change" }]
	};

	submitForm(formName: string) {
		(this.$refs[formName] as Form).validate((valid: boolean) => {
			if (valid) {
				(this as typeof Vue.prototype).$axios
					.post(`api/profiles/edit/${this.dialogData._id}`, this.dialogData)
					.then((res: AxiosResponse) => {
						console.log(res);
						this.$message({
							type: "success",
							message: res.data.msg
						});
						this.closeModal();
					});
			}
		});
	}

	closeModal() {
		this.$emit("closeModal");
	}
}
</script>
<style lang="scss" scoped>
.form-box {
	.el-input,
	.el-select {
		width: 200px !important;
	}
}
</style>

