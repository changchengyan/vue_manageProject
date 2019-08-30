export default {
	state: {
		index: 0,
	},
	mutations: {
		set_index(state, val) {

			state.index = val;
		},
	},
	getters: {
		get_index(state) {
			return state.index;
		}
	}
};
