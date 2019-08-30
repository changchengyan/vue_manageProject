<template>
	<div class="data">
		<div class="handleBack">
			<div class="back"><span class="go-back" @click="onHandleBack">返回</span></div>
		</div>

		<div class="article">
			<p>近年来，同心县落实最严格水资源制度，持续强化节水型社会建设，水利工程补短板、水利行业强监管，使水资源得到节约利用、水生态和水环境治理明显提高，为全县经济社会持续健康发展提供强有力的支撑。

			2018年，全县扬黄灌区新增节水灌溉面积1.57万亩，较2017年节约灌溉用水近300万方；万元GDP用水量280立方米；万元工业增加值用水量低于20立方米；城镇污水处理率86.2%；城市供水管网漏失率10.3%；机关节水型公共机构覆盖率达到72%；事业单位节水型公共机构覆盖率达到48%；清水河固原农业用水区达到Ⅳ类水质，清水河水质达标率达到100%；城市集中式饮用水水源地水质达标率100%；新建涉水建设项目水资源论证率达到100%，取水许可办证率达到100%。

			下一步，同心县将进一步创新机制，积极探索建立最严格水资源管理和节水型社会建设需要的节水投入机制，推进节水型社会建设持续发展
			</p>

			<p v-html="image" style="text-align: center;"></p>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				image: '<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2260305682,4220261431&fm=173&app=25&f=JPEG?w=640&h=430&s=B833409482DA1FC46602A28C0300C09B" />'
			};
		},
		methods: {
			onHandleBack() {
				const that = this;

				that.$router.push({
					name: 'waterExamine'
				});
				that.$store.commit('set_asideStatus', true);
				that.$emit('showAside');
			},
		}
	};
</script>

<style scoped="scoped" lang="scss">
	.handleBack {
		position: relative;
		width: 100%;
		height: 50px;
		padding: 10px 10px;
		background-color: #fff;
		box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.1);

		.back {
			width: 80px;
			height: 30px;
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 10;
			text-align: center;
		}
	}

	.data {
		width: 100%;

		.article {
			max-width: 1200px;
			margin-right: auto;
			margin-left: auto;
			padding: 24px;
			text-align: left;
			color: #999;
			line-height: 1.7;
			text-indent: 32px;
			text-align: justify;
		}
	}
</style>
