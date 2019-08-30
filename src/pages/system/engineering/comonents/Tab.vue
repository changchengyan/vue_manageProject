<template>
	<div class="tab-nav">
		<ul class="row">
			<li v-for="(item, key) in columns" class="col" :key="key" :class="index === item.value && 'active'" @click="_change(item.value)">{{ item.label }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		onHandleChange: {
			type: Function,
			default() {
				return () => {};
			}
		},
		columns: {
			required: true,
			type: Array,
			default() {
				return [{}];
			}
		}
	},
	data() {
		return {
			index: 0
		};
	},
	methods: {
		_change(index) {
			const that = this;
			that.index = index;

			that.$emit('onHandleChange', index);
		}
	},
	watch: {
		columns(newValue, oldValue) {
			const that = this;

			if (newValue[0].value !== oldValue[0].value) {
				const [{ value }] = that.columns;
				that.index = value;
			}
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.tab-nav {
	width: 100%;
	padding: 16px 12px 0;

	background-color: #fff;
	border-bottom: 1px solid #eee;

	.row {
		display: flex;

		list-style: none;
		margin-top: 0;
		margin-bottom: -1px;
		padding-left: 0;

		.col {
			padding: 3px 15px;
			font-size: 14px;
			color: #187cea;
			cursor: pointer;

			border: 1px solid #187cea;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
			background-color: #fff;

			+ .col {
				margin-left: 10px;
			}

			&.active {
				color: #fff;
				font-weight: bold;
				background-color: #187cea;
			}
		}
	}
}
</style>
