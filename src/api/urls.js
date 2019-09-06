import {
	DSE
} from '../moduleConfig';

const SERVICES = DSE.base_api_url;

const VIDEOSERVICE = DSE.video_api_url;

export default {


	/**
	 * 通用类
	 */
	// 上传文件的 接口 示例
	uploadFiles: `${SERVICES}/common/dseUploadFilesCtrl/uploadFiles`,
	// 上传文件的 接口 示例
	uploadFile: `${SERVICES}/common/dseUploadFilesCtrl/uploadFile`,
	// 获取分区列表 获取供水工程列表
	getDictListByValues: `${SERVICES}/common/commonCtrl/getDictListByValues`,

	// 获取分区列表
	getAreaList: `${SERVICES}/jcxxcxCtrl/getAreaList`,



	/**
	 *  一张图
	 */

	// 预警信息

		// 获取语音报警URL前缀
		getAlarmUrl:`${SERVICES}/jcxxCtrl/getAlarmUrl`,
		// 获取报警信息
		getRealTimeWarnList:`${SERVICES}/jcxxCtrl/getRealTimeWarnList`,
		// 模糊搜索
		// 一张图模糊搜索 getOneMapSearchList
		getOneMapSearchList:`${SERVICES}/jcxxCtrl/getOneMapSearchList`,




	// 管网管理




	// 工程管理

		// 获取获取水厂工程信息
		getScgcxx: `${SERVICES}/scgcxxCtrl/getScgcxx`,
		// 获取水厂相关运行信息
		getScyxxx: `${SERVICES}/scgcxxCtrl/getScyxxx`,
		// 获取水库工程基础信息
		getWrWfctB: `${SERVICES}/scgcxxCtrl/getWrWfctB`,
		// 获取水厂相关监测信息
		waterFactory_getScjcList: `${SERVICES}/scgcxxCtrl/getScjcList`,


		// 获取泵站工程信息
	    getBzgcxx:`${SERVICES}/bzgcxxCtrl/getBzgcxx`,
		// 获取泵站相关运行信息
		getBzyxxx:`${SERVICES}/bzgcxxCtrl/getBzyxxx`,
		// 获取泵站监测信息列表
		pump_getBzjcList:`${SERVICES}/bzgcxxCtrl/getBzjcList`,
		// 获取泵站工程基础信息
		getWrPumpB:`${SERVICES}/bzgcxxCtrl/getWrPumpB`,
		// 获取泵站流量列表
		getScSlList:`${SERVICES}/scgcxxCtrl/getScSlList`,
		// 获取泵站压力列表
		getBzYlList:`${SERVICES}/bzgcxxCtrl/getBzYlList`,

	// 监测管理

		// 获取实时水质监测信息
		getSzJcList: `${SERVICES}/xxjcCtrl/getSzJcList`,
		// 获取水质监测信息详情
		getSzList: `${SERVICES}/xxjcCtrl/getSzList`,

		// 获取实时水位监测信息
		getRzjcList: `${SERVICES}/xxjcCtrl/getRzjcList`,
		// 获取水质监测信息详情
		getRsvrRList: `${SERVICES}/xxjcCtrl/getRsvrRList`,

		// 获取实时流量监测信息
		getSljcList: `${SERVICES}/xxjcCtrl/getSljcList`,
		// 获取流量监测信息详情
		getSlList: `${SERVICES}/xxjcCtrl/getSlList`,

		//  获取实时压力监测信息
		getYljcList: `${SERVICES}/xxjcCtrl/getYljcList`,
		// 获取压力监测信息详情
		getYlList: `${SERVICES}/xxjcCtrl/getYlList`,



	// 巡查检修管理



	// 水量水费信息






	/**
	 *  用水分析
	 */


	/**
	 *  巡检管理
	 */


	/**
	 *  物资管理
	 */



	/**
	 *  节水管理
	 */


	/**
	 *  管网管理
	 */


	/**
	 *  应急管理
	 */



	/**
	 *  数据管理
	 */

	// 报警信息  预警信息生成

	// 报警信息  预警处理
	handleWarnInfo: `${SERVICES}/warnCtrl/handleWarnInfo`,



	// 信息监测  获取水厂监测数据列表
	getScjcList: `${SERVICES}/jcxxcxCtrl/getScjcList`,
	// 信息监测  获取水库监测数据列表
	getSkjcList: `${SERVICES}/jcxxcxCtrl/getSkjcList`,
	// 信息监测  获取联户表井监测数据列表
	getLhbjList: `${SERVICES}/jcxxcxCtrl/getLhbjList`,
	// 信息监测  获取泵站监测数据列表
	getBzjcList: `${SERVICES}/jcxxcxCtrl/getBzjcList`,
	// 信息监测  获取管道监测点数据列表
	getGdjcdList: `${SERVICES}/jcxxcxCtrl/getGdjcdList`,
	// 信息监测  获取蓄水池水位数据列表
	getXscjcList: `${SERVICES}/jcxxcxCtrl/getXscjcList`,
	//信息监测  修改监测信息
	updScjcData: `${SERVICES}/jcxxcxCtrl/updScjcData`,
	// 根据分区编码获取相应工程
	getGcByAreaCode: `${SERVICES}/gcglCtrl/getGcByAreaCode`,
	// 修改联户表井抄表数据
	updCcMeterData: `${SERVICES}/jcxxcxCtrl/updCcMeterData`,

	//  获取预警信息列表
	getWarnList: `${SERVICES}/jcxxcxCtrl/getWarnList`,
	//导出预警信息
	exportWarnList: `${SERVICES}/warnCtrl/exportWarnList`,

	// 获取农饮指标信息列表
	getDseGszbRList: `${SERVICES}/dseGszbRCtrl/getDseGszbRList`,
	// 保存更新农饮指标信息
	saveOrUpDseGszbR: `${SERVICES}/dseGszbRCtrl/saveOrUpDseGszbR`,
	// 删除农饮指标信息
	nyIndex_delete: `${SERVICES}/dseGszbRCtrl/delete`,

	/**
	 * 系统配置
	 */

	//供水工程  获取农村供水工程基本信息列表
	getWrCwsBList: `${SERVICES}/wrCwsBCtrl/getWrCwsBList`,
	// 供水工程 保存更新农村供水工程基本信息
	saveOrUpWrCwsB: `${SERVICES}/wrCwsBCtrl/saveOrUpWrCwsB`,
	// 供水工程 删除农村供水工程基本信息
	delSupplyWater: `${SERVICES}/wrCwsBCtrl/delete`,
	//供水工程  检查水厂编码是否存在
	supplyWaterCheckExist: `${SERVICES}/wrWfctBCtrl/checkExist`,
	//供水工程  启用停用供水工程
	updWrCwsUseStatus: `${SERVICES}/wrCwsBCtrl/updWrCwsUseStatus`,



	// 系统配置-监测点配置-检查水库编码是否存在
	wrResBCtrlCheckExist: `${SERVICES}/wrResBCtrl/checkExist`,
	// 系统配置-监测点配置-检查水厂编码是否存在
	wrWfctBCtrlCheckExist: `${SERVICES}/wrWfctBCtrl/checkExist`,
	// 系统配置-监测点配置-检查泵站编码是否存在
	wrPumpBCtrlCheckExist: `${SERVICES}/wrPumpBCtrl/checkExist`,
	// 系统配置-监测点配置-检查联户表井编码是否存在
	dseWrLhbjBCtrlCheckExist: `${SERVICES}/dseWrLhbjBCtrl/checkExist`,
	// 系统配置-监测点配置- 检查蓄水池编码是否存在
	dsePoolinfBCtrlCheckExist: `${SERVICES}/dsePoolinfBCtrl/checkExist`,
	// 监测点配置  删除
	sitePointdel: `${SERVICES}/dseStJcdBCtrl/delete`,


	// 系统配置-工程配置-保存更新水库基本信息
	saveOrUpWrResB: `${SERVICES}/wrResBCtrl/saveOrUpWrResB`,
	// 系统配置-工程配置-保存更新水厂基本信息
	saveOrUpWrWfctB: `${SERVICES}/wrWfctBCtrl/saveOrUpWrWfctB`,
	// 系统配置-工程配置-保存更新泵站基本信息
	saveOrUpWrPumpB: `${SERVICES}/wrPumpBCtrl/saveOrUpWrPumpB`,
	// 系统配置-工程配置-保存更新联户表井基本信息
	saveOrUpDseWrLhbjB: `${SERVICES}/dseWrLhbjBCtrl/saveOrUpDseWrLhbjB`,
	// 系统配置-工程配置-保存更新蓄水池基本信息
	saveOrUpDsePoolinfB: `${SERVICES}/dsePoolinfBCtrl/saveOrUpDsePoolinfB`,
	// 系统配置-工程配置-删除工程信息
	destoryGcgl: `${SERVICES}/gcglCtrl/delete`,
	// 系统配置-工程配置-获取工程配置列表
	getGcglList: `${SERVICES}/gcglCtrl/getGcglList`,
	saveOrUpDseWateruseB: `${SERVICES}/dseWateruseBCtrl/saveOrUpDseWateruseB`,
	// 获取联户表井用户
	getWateruseBList: `${SERVICES}/dseWateruseBCtrl/getWateruseBList`,


	// 系统配置-监测点配置-获取监测点基本信息列表
	getStJcdBList: `${SERVICES}/dseStJcdBCtrl/getStJcdBList`,
	// 系统配置-监测点配置-保存更新监测点基本信息
	saveOrUpStJcdB: `${SERVICES}/dseStJcdBCtrl/saveOrUpStJcdB`,
	// 系统配置-监测点配置-删除监测点基本信息
	destoryStJcdB: `${SERVICES}/dseStJcdBCtrl/delete`,
	// 系统配置  获取监测点监测项列表
	getStWarnList: `${SERVICES}/dseStWarnB/getStWarnList`,








	// 视频类
	//视频类 登录
	videoLogin: `${VIDEOSERVICE}//login?t=${new Date().getTime()}`,
	//视频类 获取通道 get
	getchannels: `${VIDEOSERVICE}/getchannels?t=${new Date().getTime()}`,
	//视频类 获取视频流配置 get
	getchannelsconfig: `${VIDEOSERVICE}/getchannelsconfig?t=${new Date().getTime()}`,
	//视频类 获取 视频流 get
	getchannelstream: `${VIDEOSERVICE}/getchannelstream?t=${new Date().getTime()}&&Line=‘local‘&From=’lan‘`,
	//视频类 获取 视频快照 get
	getsnap: `${VIDEOSERVICE}/api/v1/getsnap`,
	//视频类 获取视频 列表
	getVideoList: `${SERVICES}/videoCtrl/getVideoList.do`,
	//视频类 保存视频
	saveVideo: `${SERVICES}//videoCtrl/saveVideo.do`,
	//视频类 更新视频配置
	updateVideoStatus: `${SERVICES}/videoCtrl/updateVideoStatus.do`,




};
