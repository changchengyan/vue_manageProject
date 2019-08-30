<template>
	<div class="region">
		<Tab :tabs="globalTabs" @onHandleTabChange="onHandleGlobalTabChange" />
		<component :is="modelComponet"></component>
	</div>
</template>

<script>
	import Tab from '../../../common/components/dseTab';

let DEVSTATISTIC = ()=>import('@/pages/material/analysis/devStatistic');
let SPAREPARTS = ()=>import('@/pages/material/analysis/spareParts');

export default {
	components: {Tab},
	data() {
		return {
			globalTabIndex: 0,
			globalTabs: ['设备分析', '备品备件分析'],
			modelComponet:DEVSTATISTIC
		};
	},
	mounted() {


	},
	methods: {

		onHandleGlobalTabChange(globalTabIndex) {
			const that = this;
			that.globalTabIndex = globalTabIndex;
			switch (globalTabIndex) {
				case 0:
					this.modelComponet = DEVSTATISTIC;
					break;
				case 1:
					this.modelComponet = SPAREPARTS;
					break;
				default:
					break;
			}
		},
	}
};
</script>

<style lang="scss" scoped="scoped">
.region{
	width: 100%;
	height: 100%;
}


</style>
