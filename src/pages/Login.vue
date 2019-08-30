<template>
	<div class="login">
		<div class="wrap">
			<div class="top-title"><img src="../assets/images/home/logo.png" alt="" /></div>
			<div class="top-title"><span>东深农饮</span></div>
			<div class="top-title"><span>信息化管理平台</span></div>
			<div class="inner-wrap">

				<el-form ref="form" :model="ruleForm" :rules="rules" label-width="0px">
					<el-form-item  prop="username">
						<i class="el-icon-user"></i>
						<el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="ruleForm.password" placeholder="密码"></el-input>
						<i class="el-icon-lock"></i>
					</el-form-item>
					<el-form-item >
<!--						<el-button type="primary" @click="submitAcount">登录</el-button>-->
						<div class="submit-btn"  @click="submitAcount"><span>登录</span></div>
					</el-form-item>
				</el-form>
<!--				<div class="user-input">-->
<!--					<input type="text" v-model="ruleForm.username" placeholder="用户名" />-->
<!--				</div>-->
<!--				<div class="pwd-input">-->
<!--					<input type="password" v-model="ruleForm.password" placeholder="密码" />-->
<!--				</div>-->

<!--				<div class="submit-btn" @keyup.native.13="submitAcount" @click="submitAcount"><span>登录</span></div>-->
			</div>
		</div>
		<!--        <div class="footer">-->
		<!--            ©建设单位：同心县水务局-->
		<!--            &nbsp;&nbsp;&nbsp;&nbsp;-->
		<!--            ©技术支持：东深电子股份有限公司-->
		<!--        </div>-->
	</div>
</template>

<script>
// let that = null;
//
// window.onkeyup = function(event) {
// 	let keyCode = event.keyCode;
// 	if (keyCode == 13) {
// 		that.submitAcount();
// 	}
// };

export default {
	data() {
		return {
			ruleForm: {
				username: '',
				password: ''
			},
			rules:{
				username:[
					{
						required:true,
						message:'用户名不能为空!',
						trigger: 'blur'
					}
				],
				password:[
					{
						required:true,
						message:'密码不能为空!',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		submitAcount() {
			let that = this;
			this.$refs.form.validate(valid=>{
				if(valid){
					that.$router.push({ name: 'ruralDrikingWater' });
				}

			});
		}
	},
	created() {

	}
};
</script>

<style scoped lang="scss">
.login {
	width: 100%;
	height: 100%;
	background: url('../assets/images/home/login_bg.png') no-repeat;
	background-size: cover;
	background-position: center center;
	backdrop-filter: blur(3px);

	.wrap {
		width: 400px;
		height: 100%;
		padding: 0 20px;
		margin: 0 auto;
		position: relative;
		border-right: 1px solid #fff;
		border-left: 1px solid #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background: rgba(255, 255, 255, 0.1);

		.top-title {
			width: 100%;
			text-align: center;
			font-size: 26px;
			&:nth-child(1) {
				background: #fff;
				border-radius: 50%;
				width: 100px;
				height: 100px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
			}

			&:nth-child(3) {
				height: 100px;
				padding-bottom: 40px;
			}
			img {
				width: 60px;
			}

			span {
				font-size: 28px;
				font-weight: 600;
				color: #fff;
			}
		}

		.inner-wrap {
			width: 100%;
			.head-title {
				width: 100%;
				padding: 10px 0;
				text-align: center;
				font-size: 30px;
				font-weight: 600;
				color: #1775ef;
				margin-bottom: 20px;
			}

			.el-form-item{
				position: relative;
				display: flex;
				justify-content: center;
				width: 100%;
				/deep/ .el-form-item__content{
					width: 100%;
				}
			}
		/deep/	.el-input__inner {
				display: inline-block;
				width: 100%;
				padding-left: 40px;
				background: none;
				outline: none;
				border: 2px solid #fff;
				border-radius: 5px;
				font-size: 18px;
				color: #fff;
				line-height: 40px !important;
				height: 40px!important;

				&::-webkit-autofill {
					box-shadow: 0 0 0px 1000px white inset;
				}
			}
			i {
				color: #fff;
				font-size: 18px;
				position: absolute;
				top: 9px;
				left: 10px;
			}

			::-webkit-input-placeholder {
				/* WebKit browsers */
				color: #fff;
				font-size: 18px;
			}

			::-moz-placeholder {
				/* Mozilla Firefox 19+ */
				color: #fff;
				font-size: 18px;
			}

			:-ms-input-placeholder {
				/* Internet Explorer 10+ */
				color: #fff;
				font-size: 18px;
			}

			.user-input,
			.pwd-input {
				width: calc(100% - 40px);
				margin: 0 auto;
				height: 40px;
				line-height: 40px;
				margin-bottom: 20px;
				position: relative;

				i {
					position: absolute;
					top: 11px;
					left: 10px;
				}
			}

			.submit-btn {
				width: calc(100% - 40px);
				height: 80px;
				padding-top: 40px;
				letter-spacing: 2px;
				margin: 0 auto;

				span {
					display: inline-block;
					width: 100%;
					line-height: 40px;
					font-size: 20px;
					font-weight: 600;
					background: #fff;
					border-radius: 5px;
					color: #154165;
					cursor: pointer;
					text-align: center;
					&:hover{
						background: #0b83fe;
						color: #fff;
					}
				}
			}
		}
	}

	.footer {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
}

.clearfix:after {
	content: '.';
	display: block;
	height: 0;
	visibility: hidden;
	clear: both;
}

.clearfix {
	*zoom: 1;
}
</style>
