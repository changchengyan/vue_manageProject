<template>
	<div class="row">
		<span>分区选择</span>
		<span class="all" @click="onHandleClearAreaItem">全部</span>
		<div class="list" ref="area">
			<template v-if="tempAreaList && tempAreaList.length > 0">
				<span
					:title="val.name"
					:class="{ actived: tabAreaIndex == index }"
					@click="onHandleSelectAreaItem(val.id, index, '0')"
					class="tab-item"
					v-for="(val, index) in tempAreaList"
					:key="index"
				>
					{{ val.name }}
				</span>
			</template>
			<template v-else>
				<span>请配置~~</span>
			</template>
			<div class="show-more-model" v-if="showModelArea">
				<div class="model-top"><i class="el-icon-close" @click="onHandleShowMoreArea"></i></div>
				<div class="left-list">
					<span
						:class="{ actived: tabAreaIndex == index + tempAreaList.length - 1 }"
						:title="val.name"
						@click="onHandleSelectAreaItem(val.id, index, '1')"
						class="tab-item"
						v-for="(val, index) in leftAreaList"
						:key="index"
					>
						{{ val.name }}
					</span>
				</div>
			</div>
		</div>
		<span class="more" @click="onHandleShowMoreArea" v-if="showAreaMore">更多></span>
	</div>
</template>

<script>
export default {
	props: {
		onHandleClearAreaItem: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleSelectAreaItem: {
			type: Function,
			default() {
				return () => {};
			}
		},
		onHandleShowMoreArea: {
			type: Function,
			default() {
				return () => {};
			}
		},
		tempAreaList: {
			type: Array,
			default() {
				return [];
			}
		},
		leftAreaList: {
			type: Array,
			default() {
				return [];
			}
		},
		tabAreaIndex: {
			type: Number,
			default() {}
		},
		showModelArea: {
			type: Boolean,
			default() {
				return false;
			}
		},
		showAreaMore: {
			type: Boolean,
			default() {
				return false;
			}
		}
	},
	name: 'dse-filterTab'
};
</script>

<style scoped lang="scss">
.row {
	width: 100%;
	height: 40px;

	padding: 5px 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;

	span {
		display: inline-block;
		margin-right: 10px;
		width: 70px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		line-height: 30px;

		&:last-child {
			margin-right: 0px;
		}

		&.all {
			background: #ccc;
			color: #fff;
		}

		&.more {
			color: #0b83fe;
			text-decoration: underline;
			cursor: pointer;
		}

		&.tab-item {
			cursor: pointer;

// 			&:hover {
// 				color: #0b83fe;
// 			}
		}

		&.actived {
			background: #0b83fe;
			color: #fff;
		}
	}

	.list {
		width: calc(100% - 220px);
		position: relative;
		text-align: left;

		.show-more-model {
			position: absolute;
			top: 40px;
			left: 0;
			z-index: 2;
			width: 100%;
			border-radius: 6px;
			background: #f2f2f2;
			box-shadow: 0 1px 2px 3px rgba(0, 0, 0, 0.1);

			.model-top {
				display: flex;
				justify-content: flex-end;
				height: 10px;
				align-items: center;
				position: relative;

				i {
					position: absolute;
					top: 2px;
					right: 2px;
					cursor: pointer;
				}
			}

			.left-list {
				width: 100%;
				display: flex;
				flex-flow: wrap;
				justify-content: flex-start;
				align-items: center;
			}
		}
	}
}
</style>
