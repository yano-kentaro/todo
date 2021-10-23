export const state = () => ({
	id: 0,
	todos: [{
		taskId: 0,
		taskName: 'test',
		registDate: '2021-10-16 10:00:00',
		updateDate: '2021-10-16 10:00:00',
		taskState: '作業前',
	}],
	filtered: [{
		taskId: 0,
		taskName: 'test',
		registDate: '2021-10-16 10:00:00',
		updateDate: '2021-10-16 10:00:00',
		taskState: '作業前',
	}],
});

export const mutations = {
	// 新規登録機能
	insertState(state, obj) {
		// 登録日時を算出
		var d = new Date();
		var fmt = d.getFullYear()
						+ '-' + ('00' + (d.getMonth() + 1)).slice(-2)
						+ '-' + ('00' + d.getDate()).slice(-2)
						+ ' ' + ('00' + d.getHours()).slice(-2)
						+ ':' + ('00' + d.getMinutes()).slice(-2)
						+ ':' + ('00' + d.getSeconds()).slice(-2);
		// taskを追加
		state.todos.unshift({
			taskId: state.id,
			taskName: obj.taskName,
			registDate: fmt,
			updateDate: fmt,
			taskState: '作業前',
		});
		state.id++;
	},
	editState(state, task) {
		// 更新日時を算出
		var d = new Date();
		var fmt = d.getFullYear()
						+ '-' + ('00' + (d.getMonth() + 1)).slice(-2)
						+ '-' + ('00' + d.getDate()).slice(-2)
						+ ' ' + ('00' + d.getHours()).slice(-2)
						+ ':' + ('00' + d.getMinutes()).slice(-2)
						+ ':' + ('00' + d.getSeconds()).slice(-2);
		if(task.taskState === '作業前') {
			task.taskState = '作業中';
			task.updateDate = fmt;
		} else if (task.taskState === '作業中') {
			task.taskState = '完了';
			task.updateDate = fmt;
		} else {
			state.filtered = state.todos.filter((todo) => {
				return (todo.taskId !== task.taskId);
			});
		}
	},
	deleteTask(state, task) {
		state.filtered = state.todos.filter((todo) => {
			return (todo.taskId !== task.taskId);
		});
	},
	filterTasksAll(state) {
		state.filtered = state.todos.filter((todo) => {
			return (todo.taskState !== '');
		});
	},
	filterTasks(state, taskState) {
		state.filtered = state.todos.filter((todo) => {
			return (todo.taskState == taskState);
		});
	},
}