<template>
</template>

<script>
export default {
	props: {
		tabIndex: {
			type: Number,
			default() {
				return 0;
			}
		},
		tabsList: {
			type: Array,
			default() {
				return [{}];
			}
		},
		areaList: {
			type: Array,
			default() {
				return [{}];
			}
		},
		onHandleChangeArea: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleChangeEngineering: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleChangeMonitor: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleSearch: {
			type: Function,
			default() {
				return () => {};
			}
		},
		// getThisTime
		onHandleDatePicker: {
			type: Function,
			default() {
				return () => {};
			}
		},
		// showThisChart_waterFactory
		onHandleRadioToogle: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleListModelVisible: {
			type: Function,
			default() {
				return () => {};
			}
		}
	},
	methods: {
		name() {}
	}
};
</script>

<style lang="scss" scoped="scoped">
@import './style.scss';
</style>
