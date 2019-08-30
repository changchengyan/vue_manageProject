export default {
    state: {
		sys_monitor_tabIndex:null
    },
    mutations: {
        set_sys_monitor_tabIndex(state,val) {
            state.sys_monitor_tabIndex = val;
            sessionStorage.setItem('sys_monitor_tabIndex',val);
        }
    },
    actions: {

    },
    getters: {
        get_sys_monitor_tabIndex(state) {
            if(!state.sys_monitor_tabIndex) {
                state.sys_monitor_tabIndex = sessionStorage.getItem('sys_monitor_tabIndex');
            }
            return state.sys_monitor_tabIndex||0;
        }
    }
};
