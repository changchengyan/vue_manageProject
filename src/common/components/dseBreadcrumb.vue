<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>当前所在位置:</el-breadcrumb-item>
<!--			<el-breadcrumb-item v-for="(item, key) in list" :key="key" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>-->
			<span>{{showBread.label}}</span>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default {
		name:'dse-breadcrumb',
		data() {
			return {
				showBread:''
			};
		},
		methods:{
			showItem(obj){
				this.showBread = {
					label:obj.label,
					path:obj.path
				};
			}
		},
		mounted() {
			const that = this;

			const {
				meta = {}
			} = that.$route;
			const {
				crumbs = []
			} = meta;
			that.showBread = crumbs[0] || {};
		},
		watch:{
			'$route'(to, from) {
				this.showBread = to.meta.crumbs[0];
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	.breadcrumb {
		display: flex;
		align-items: center;

		height: 30px;
		padding-right: 10px;
		padding-left: 10px;
		border-bottom: 1px solid #eee;
		background-color: #fff;
	}
</style>
