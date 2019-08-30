<template>
	<div id="mainWidthMenu">
		<dse-header-inner />
		<router-view  @asideShow="asideShow" @thisTab="changeTabs" @hiddenAside="hidden_aside" @showAside="show_aside"></router-view>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';

	// import DseMenu from '../common/components/dseMenu';
	import DseHeaderInner from '../common/components/dseHeaderInner';

	export default {
		name: 'mainWidthMenu',
		components: {
			DseHeaderInner,
		},
		data() {
			return {
				transitionName: 'slide-left',
				activePage: 1,
				wd: '',
				content_wd: '',
				main_left: '200px',
				showAside: true,
				small: false,
				asideLeft: '',
				MenuData: [],
				ifHomePage: true,
				homeId: 'FarmingDrinkingImage'
			};
		},
		computed: {
			...mapGetters({
				menuList: 'get_menuList',
				asideStatus: 'get_asideStatus'
			})
		},
		methods: {
			changeTabs(num) {
				this.MenuData = this.menuList;
			},
			breadcrumb(obj){
				this.$refs.bread.showItem(obj);
			},
			hidden_aside() {
				this.showAside = this.asideStatus;

				this.content_wd = 'calc(100%)';
				this.asideLeft = '0px';
			},
			show_aside() {
				this.showAside = this.asideStatus;
				if (this.small) {
					this.content_wd = 'calc(100% - 80px)';
					this.asideLeft = '80px';
				} else {
					this.content_wd = 'calc(100%  - 80px)';
					this.asideLeft = '80px';
				}
			},
			asyncMenuList(arr) {
				this.MenuData = JSON.parse(JSON.stringify(arr));
			},
			asideShow(flag){
				this.ifHomePage = false;
			}
		},
		created() {

			if (window.id === this.homeId) {
				this.ifHomePage = true;
			} else {
				this.ifHomePage = false;
			}


			let sys_width = document.body.clientWidth;
			if (sys_width < 1600) {
				this.wd = '80px';
				this.small = true;
				this.asideLeft = '80px';
				this.content_wd = 'calc(100%  - 80px)';
			} else {
				this.small = false;
				this.wd = '80px';
				this.content_wd = 'calc(100% - 80px)';
				this.asideLeft = '80px';
			}

			this.MenuData = this.menuList;
		},
		watch: {
			'$route'(to, from) {
				const toIndex = to.meta.index;
				const fromIndex = from.meta.index;

				this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
			}
		}
	};
</script>

<style scoped lang="scss">
	#mainWidthMenu {
		width: 100%;
		height: 100%;
		min-width: 1024px;
		// min-height: 768px;

		transition: all 0.3s;

		.slide-right-enter-active,
		.slide-right-leave-active,
		.slide-left-enter-active,
		.slide-left-leave-active {
			will-change: transform;
			transition: all 500ms;
			position: absolute;
		}

		.slide-right-enter {
			opacity: 0;
			transform: translate3d(-100%, 0, 0);
		}

		.slide-right-leave-active {
			opacity: 0;
			transform: translate3d(100%, 0, 0);
		}

		.slide-left-enter {
			opacity: 0;
			transform: translate3d(100%, 0, 0);
		}

		.slide-left-leave-active {
			opacity: 0;
			transform: translate3d(-100%, 0, 0);
		}

		.el-container {
			width: 100%;
			height: 100%;
			// min-height: 100%;
		}

		aside {
			height: 100%;
			overflow-y: auto;
			font-weight: 600;
			border-right: none;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);

			li {
				border-right: none;
				border-left: none;

				i {
					color: #878687;
					display: inline-block;
					margin-right: 10px;
				}

				&:hover {
					background-image: linear-gradient(to right, #1edff9, #127cd1);
					color: #fff !important;

					i {
						color: #fff !important;
					}
				}

				&.is-active {
					i {
						color: #fff;
					}
				}
			}
		}

		.child-view {
			// width: calc(100% - 260px);
			// position: absolute;
			// top: 96px;
			// height: 100%;
			overflow: hidden;
		}

		.is-vertical{
		/deep/	.el-container{
			height: calc(100% - 85px);
			}
		}
	}
</style>
