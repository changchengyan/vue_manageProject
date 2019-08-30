<template>
	<div class="globalHeader">
		<div class="nav">
			<h1 class="logo" @click="backLogin">
				<img src="../../../build/logo.png" />
				<span>东深农饮信息化管理平台</span>
			</h1>
			<ul class="row">
				<li v-for="(item, key) in list" :key="key" class="col" :class="key === index && 'active'" @click="gotoThisPage(key,item)">
					<a href="JavaScript:void(0)">{{ item.text }}</a>
				</li>
			</ul>
		</div>

		<div class="hgroup">
			<div class="user">
				<div class="bg-logo"><img src="../../assets/images/home/user.png" alt="" /></div>
				<div class="user-count">
					<span>颍东供水-综合</span>
					<span>李建国</span>
				</div>
			</div>
			<div class="exit-btn" @click="backLogin"><a href="#">退出</a></div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'dse-headerInner',
	data() {
		return {
			index: 0,
			list: [],
			tabClickFlag:false, //默认是刷新跳转
		};
	},
	mounted() {
		const that = this;
		that._initialization();
		this.index = sessionStorage.getItem('currentRootIndex')?parseInt(sessionStorage.getItem('currentRootIndex')):0;

		if(this.index!=0){
			this._goNavPage(that.index);
		}
	},
	methods: {
		_goNavPage(key) {

			const that = this;
			that.index = key;
			sessionStorage.setItem('currentRootIndex',key);
			if(!this.tabClickFlag){
				let childIndex = sessionStorage.getItem('currentChildIndex')? parseInt(sessionStorage.getItem('currentChildIndex')):0;
				sessionStorage.setItem('currentChildIndex',childIndex);
			}else{
				sessionStorage.setItem('currentChildIndex',0);
			}


			switch (key) {
				case 0:
					this.$router.push({name:'oneMap'});
					break;
				case 1:
					this.$router.push({path:'/analysis'});
					break;
				case 2:
					this.$router.push({path:'/routing'});
					break;
				case 3:
					this.$router.push({path:'/material'});
					break;
				case 4:
					this.$router.push({path:'/water'});
					break;
				case 5:
					this.$router.push({path:'/pipeRecord'});
					break;
				case 6:
					this.$router.push({path:'/emergency'});
					break;
				case 7:
					this.$router.push({path:'/data'});
					break;
				case 8:
					this.$router.push({path:'/system'});
					break;
			}
		},

		gotoThisPage(key,item){
			let currentPath = this.$route.path;
			if(currentPath.indexOf(item.action)>-1){
				return;
			}

			this.tabClickFlag = true;
			this._goNavPage(key);
		},
		_initialization() {
			const that = this;

			// 初始化
			that.list = [
				{
					text: '一张图',
					action: '/oneMap',
					menu:0
				},
				{
					text: '用水分析',
					action: '/analysis',
					menu:3
				},
				{
					text: '巡检管理',
					action: '/routing',
					menu:0
				},
				{
					text: '物资管理',
					action: '/material'
				},
				{
					text: '节水管理',
					action: '/water'
				},
				{
					text: '管网管理',
					action: '/pipeRecord'
				},
				{
					text: '应急管理',
					action: '/emergency'
				},
				{
					text: '数据管理',
					action: '/data'
				},
				{
					text: '系统配置',
					action: '/system'
				}
			];
		},
		//返回登录界面
		backLogin(){
			this.$router.push({
				path:'/#/login'
			});
			sessionStorage.setItem('__token__','');
		}
	},
	created() {

	}
};
</script>

<style scoped="scoped" lang="scss">
.globalHeader,
.nav {
	display: flex;
	align-items: center;
}

.globalHeader {
	justify-content: space-between;

	height: 55px !important;
	padding: 0 20px;
	line-height: 1;
	background: linear-gradient(to right, #2eb3e5, #27a1e6, #1b82ea, #4371ec);

	@media screen and (max-width: 1365px) {
		padding: 0 5px;
	}
	.hgroup,
	.hgroup .user {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hgroup {
		.user {
			width: 180px;

			.bg-logo {
				width: 40px;
				height: 40px;

				img {
					width: 40px;
					height: 40px;
				}
			}

			.user-count {
				width: calc(100% - 45px);

				span {
					display: inline-block;
					line-height: 1.5;
					color: #fff;
					width: 100%;
				}
			}
		}

		.exit-btn {
			a {
				color: #fff;
			}
		}
	}

	.nav {
		width: calc(100% - 215px);
		display: flex;
		justify-content: flex-start;

		.logo {
			display: flex;
			align-items: center;
			margin-right: 10px;

			color: #fff;

			cursor: pointer;
			@media screen and (max-width: 1600px) and (min-width: 1366px) {
				font-size: 18px;
			}
			@media screen and (min-width: 1601px) {
				font-size: 20px;
			}

			img {
				margin-right: 10px;
				width: 40px;
				height: 40px;
			}
			@media screen and (max-width: 1365px) {
				font-size: 14px;
				img {
					width: 30px;
					height: 30px;
				}
			}
		}

		.row {
			flex: 1;
			list-style: none;
			display: flex;
			justify-content: space-between;
			@media screen and (min-width: 1601px) {
				margin-left: 49px;
			}
			@media screen and (max-width: 1600px) and (min-width: 1366px) {
				margin-right: 30px;
			}
			@media screen and (max-width: 1365px) {
				margin-right: 15px;
			}

			padding-left: 0;
		}

		.col {
			flex: 1;
			position: relative;
			height: 100%;

			&.active {
				background-image: url(../../assets/images/home/navActive.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;

				a {
					position: relative;
					color: #1b84ea;

					&:after {
						position: absolute;
						right: 0;
						bottom: 0;
						left: 50%;
						height: 8px;
						content: '';
						transform: translateX(-50%);
						background-color: #1b84ea;
					}
				}
			}

			a {
				display: block;
				padding: 25px 0;
				padding: 20px 0;
				text-decoration: none;
				color: #fff;
				text-align: center;
				font-weight: bold;
				@media screen and(min-width: 1601px) {
					font-size: 16px;
				}

				@media screen and(max-width: 1600px) and (min-width: 1366px) {
					font-size: 14px;
				}
				@media screen and(max-width: 1365px) {
					font-size: 12px;
				}
			}

			&:not(:last-child):after {
				position: absolute;
				width: 1px;
				height: 27px;
				background-color: rgba(255, 255, 255, 0.4);
				content: '';
				top: 50%;
				right: -1px;
				bottom: 0;
				z-index: 100;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
