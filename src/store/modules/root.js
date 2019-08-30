/**
 *  初始化 获取 登录后的 用户关键信息
 */

export default {
	state: {
		// 分区列表
		partitions: [],
		menuList: [], //菜单列表
		asideStatus: true, //侧边菜单是否关闭 默认不关闭
		initRouteCount: 0, // 初始化 路由调用的计数
		companyName: '', //公司名称
		companyId: '', //公司Id
		userName: '', //用户名称
		userId: '', //用户id
		deptName: '', //部门名称
		deptId: '', //部门ID
		tel: '', //手机号
		btnsIds: [], //按钮级Id 资源
		cityPosition: [], //城市经纬度
		orgTree: [], //组织树
		filePath: '', //静态文件的绝对路径
		cityAreas: [], //分区列表
		audioList: []
	},
	mutations: {
		set_partition(state, payload) {
			state.partitions = payload;
			sessionStorage.setItem('partitions',payload);
		},
		set_cityAreas(state, val) {
			state.cityAreas = val;
			sessionStorage.setItem('cityAreas', JSON.stringify(val));
		},
		set_menuList(state, val) {
			state.menuList = val;
			sessionStorage.setItem('menuList',JSON.stringify(val));
		},
		set_asideStatus(state, val) {
			state.asideStatus = val;
			sessionStorage.setItem('asideStatus',val);
		},
		set_companyName(state, val) {
			state.companyName = val;
			sessionStorage.setItem('companyName',val);
		},
		set_companyId(state, val) {
			state.companyId = val;
			sessionStorage.setItem('companyId',val);
		},
		set_userName(state, val) {
			state.userName = val;
			sessionStorage.setItem('userName',val);
		},
		set_userId(state, val) {
			state.userId = val;
			sessionStorage.setItem('userId',val);
		},
		set_deptName(state, val) {
			state.deptName = val;
			sessionStorage.setItem('deptName',val);
		},
		set_deptId(state, val) {
			state.deptId = val;
			sessionStorage.setItem('deptId',val);
		},
		set_tel(state, val) {
			state.tel = val;
			sessionStorage.setItem('tel',val);
		},
		set_btnsIds(state, val) {
			state.btnsIds = val;
			sessionStorage.setItem('btnsIds',val);
		},
		set_initRouteCount(state, val) {
			state.initRouteCount = val;
			sessionStorage.setItem('initRouteCount',val);
		},
		set_cityPosition(state, val) {
			state.cityPosition = val;
			sessionStorage.setItem('cityPosition',val);
		},
		set_orgTree(state, val) {
			state.orgTree = val;
			sessionStorage.setItem('orgTree', JSON.stringify(val));
		},
		set_filePath(state, val) {
			state.filePath = val;
			sessionStorage.setItem('filePath',val);
		},
		set_audioList(state, val) {
			state.audioList = val;
			sessionStorage.setItem('audioList', JSON.stringify(val) );
		},
		setAside_status(state, val) {
			state.asideStatus = val;
			sessionStorage.setItem('asideStatus',val);
		}
	},
	actions: {},
	getters: {
		get_partition(state) {
			if(!state.partitions) {
				state.partitions = sessionStorage.getItem('partitions');
			}
			return state.partitions;
		},
		get_cityAreas(state) {
			if(state.cityAreas.length==0) {
				state.cityAreas = JSON.parse(sessionStorage.getItem('cityAreas'));
			}
			return state.cityAreas;
		},
		get_menuList(state) {
			if(state.menuList.length==0) {
				state.menuList = JSON.parse(sessionStorage.getItem('menuList'));
			}
			return state.menuList;
		},
		get_asideStatus(state) {
			if(!state.asideStatus) {
				state.asideStatus = sessionStorage.getItem('asideStatus');
			}
			return state.asideStatus;
		},
		get_initRouteCount(state) {
			if(!state.initRouteCount) {
				state.initRouteCount = sessionStorage.getItem('initRouteCount');
			}
			return state.initRouteCount;
		},
		get_companyName(state) {
			if(!state.companyName) {
				state.companyName = sessionStorage.getItem('companyName');
			}
			return state.companyName;
		},
		get_companyId(state) {
			if(!state.companyId) {
				state.companyId = sessionStorage.getItem('companyId');
			}
			return state.companyId;
		},
		get_userName(state) {
			if(!state.userName) {
				state.userName = sessionStorage.getItem('userName');
			}
			return state.userName;
		},
		get_userId(state) {
			if(!state.userId) {
				state.userId = sessionStorage.getItem('userId');
			}
			return state.userId;
		},
		get_deptName(state) {
			if(!state.deptName) {
				state.deptName = sessionStorage.getItem('deptName');
			}
			return state.deptName;
		},
		get_deptId(state) {
			if(!state.deptId) {
				state.deptId = sessionStorage.getItem('deptId');
			}
			return state.deptId;
		},
		get_tel(state) {
			if(!state.tel) {
				state.tel = sessionStorage.getItem('tel');
			}
			return state.tel;
		},
		get_btnsIds(state) {
			if(state.btnsIds.length==0) {
				state.btnsIds = JSON.parse(sessionStorage.getItem('btnsIds')) ;
			}
			return state.btnsIds;
		},
		get_cityPosition(state) {
			if(!state.cityPosition) {
				state.cityPosition = sessionStorage.getItem('cityPosition');
			}
			return state.cityPosition;
		},
		get_orgTree(state) {
			if(state.orgTree.length==0) {
				state.orgTree = JSON.parse(sessionStorage.getItem('orgTree')) ;
			}
			return state.orgTree;
		},
		get_filePath(state) {
			if(!state.filePath) {
				state.filePath = sessionStorage.getItem('filePath') ;
			}
			return state.filePath;
		},
		get_audioList(state) {
			if(state.audioList.length==0) {
				state.audioList = JSON.parse(sessionStorage.getItem('audioList')) ;
			}
			return state.audioList;
		}
	}
};
