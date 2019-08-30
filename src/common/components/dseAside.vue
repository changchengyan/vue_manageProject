<template>
	<div class="globalAsideNav">
		<div v-for="(item, key) in list" :key="key" class="item" :class="key === index && 'active'" @click="_goNavPage(key)">
			<i :class="'iconfont icon-' + item.icon"></i>
			<span>{{ item.text }}</span>
		</div>
	</div>
</template>

<script>
import qs from 'qs';

export default {
	data() {
		return {
			index: 0,
			list: []
		};
	},
	watch: {
		$route(to, _from) {
			const that = this;
			// if (to.path !== to._from) {
				that._initialization(to.meta.links);
			// }
		}
	},
	methods: {
		_goNavPage(index = 0) {
			const that = this;

			that.index = index;

			const { list = [] } = that;
			const { path = '', text = '' } = list[index];

			that.$router.push(path);

			this.$emit('breadcrumb', {
				path,
				label: text
			});
		},
		_initialization(list) {
			const that = this;
			that.list = list;
			this.index =sessionStorage.getItem('currentChildIndex')? parseInt(sessionStorage.getItem('currentChildIndex')):0;
			this.$nextTick(()=>{
				setTimeout(()=>{
					that.$router.push({path:list[that.index].path});
				},500);
			});
		}
	},
	mounted() {

		// that._initialization();
	}
};
</script>

<style scoped="scoped" lang="scss">
.globalAsideNav {
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 80px !important;

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		padding-top: 12px;
		padding-bottom: 12px;
		cursor: pointer;
		font-weight: normal;
		color: #187cea;
		text-align: center;

		&.active {
			color: #fff;
			background-color: #187cea;

			i {
				color: #fff;
			}
		}

		i {
			margin-bottom: 8px;
			font-size: 40px;
			color: #187cea;
		}

		span {
			line-height: 1.5;
		}
	}
}
</style>
