<template>
	<div class="tab">
		<ul class="row">
			<li v-for="(item, key) in tabs" :key="key" class="col" :class="tabIndex === key && 'active'" @click="_tabChange(key)">
				<a href="JavaScript:void(0)">{{ item }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default () {
					return ['壹', '贰', '叁'];
				}
			},
			onHandleTabChange: {
				type: Array,
				default () {
					return ['壹', '贰', '叁'];
				}
			},
		},
		data() {
			return {
				tabIndex: 0
			};
		},
		methods: {
			_tabChange(tabIndex) {
				const that = this;

				that.tabIndex = tabIndex;

				that.$emit('onHandleTabChange', tabIndex);
			}
		},
	};
</script>

<style scoped="scoped" lang="scss">
	.tab {
		padding-right: 16px;
		padding-left: 16px;
		border-bottom: 1px solid #e7e6e6;
		font-size: 14px;
		background-color: #fff;

		.row {
			display: flex;

			list-style: none;
			margin-top: 0;
			margin-bottom: 0;
			padding-left: 0;
			list-style: none;

			.col {
				padding-right: 16px;
				padding-left: 16px;

				a {
					list-style: none;
					text-decoration: none;

					display: block;
					padding-top: 8px;
					padding-bottom: 8px;

					color: #7796bb;
					cursor: pointer;
				}

				&.active {
					a {
						color: #187cea;
						font-weight: bold;
						border-bottom: 1px solid #187cea;
					}
				}
			}
		}
	}
</style>
