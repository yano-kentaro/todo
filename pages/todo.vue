<template>
	<v-row justify="center" align="center">

		<!-- タスク追加エリア -->
		<v-card class="py-4 d-flex justify-center" width="80%">
			<v-spacer />
			<v-text-field
				v-model="taskName"
				:rules="rules"
				counter="true"
				outlined
			></v-text-field>
			<v-btn
				color="primary"
				x-large
				style="margin-left: 10px;"
				@click="newTask"
			>追加</v-btn>
			<v-spacer />
		</v-card>

		<!-- フィルターエリア -->
		<v-card class="py-4 d-flex justify-center" width="80%">
			<v-btn
				large
				style="margin: 0 20px;"
				width="15%"
				color="success"
				@click="filterTasksAll"
			>全て</v-btn>
			<v-btn
				large
				style="margin: 0 20px;"
				width="15%"
				color="primary"
				@click="filterTasks('作業前')"
			>作業前</v-btn>
			<v-btn
				large
				style="margin: 0 20px;"
				width="15%"
				color="secondary"
				@click="filterTasks('作業中')"
			>作業中</v-btn>
			<v-btn
				large
				style="margin: 0 20px;"
				width="15%"
				color="error"
				@click="filterTasks('完了')"
			>完了</v-btn>
		</v-card>

		<!-- 検索エリア -->
		<v-card class="py-4 d-flex justify-center" width="80%">
			<v-spacer />
			<v-card-title>Todo List</v-card-title>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Search"
				single-line
				hide-details
				style="margin-left: 10%;"
			></v-text-field>
			<v-spacer />
		</v-card>

		<!-- ToDoリストエリア -->
		<v-card class="py-4 d-flex justify-center" width="80%">
			<v-data-table
				:headers="headers"
				:items="filtered"
				:search="search"
				style="width: 80%;"
				:items-per-page=5
			>

				<!-- 状態表示の子コンポーネント -->
				<template v-slot:item.taskState="{ item }">
					<v-btn
						:color="getColor(item.taskState)"
						@click="taskStateChange(item)"
					>{{item.taskState}}</v-btn>
				</template>

				<!-- 削除ボタンの子コンポーネント -->
				<template v-slot:item.delete="{ item }">
					<v-btn
						color="error"
						@click="deleteTask(item)"
					>削除</v-btn>
				</template>

			</v-data-table>
		</v-card>

	</v-row>
</template>

<script>
	export default {
		data: () =>({
			// タスク名
			taskName: '',
			// バリデーション
			rules: [
				value => (value || '').length <= 20 || 'Max 20 characters',
			],
			// Todoリスト ヘッダー
			headers: [
				{
					text: 'タスク',
					align: 'center',
					sortable: true,
					value: 'taskName',
				},
				{
					text: '登録日時',
					align: 'center',
					sortable: true,
					value: 'registDate',
				},
				{
					text: '最終更新',
					align: 'center',
					sortable: true,
					value: 'updateDate',
				},
				{
					text: '状態',
					align: 'center',
					value: 'taskState',
				},
				{
					text: '削除',
					align: 'center',
					value: 'delete',
				},
			],
			// 検索欄
			search: '',
			// tasks: [],
		}),
		methods: {
			newTask() {
				// タスクの新規登録
				if(this.taskName) {
					this.$store.commit('localStorage/insertState',{taskName: this.taskName});
					this.$store.commit('localStorage/filterTasksAll');
					this.taskName = '';
				}
			},
			// タスクの状態変更
			taskStateChange(task) {
				this.$store.commit('localStorage/editState', task);
			},
			// タスクの削除
			deleteTask(task) {
				this.$store.commit('localStorage/deleteTask',task);
			},
			// 状態の色変更
      getColor(taskstate) {
        if (taskstate == '作業前') return 'primary' ;
        else if (taskstate == '作業中') return 'secondary' ;
        else return 'error' ;
      },
			// 表示タスクの絞り込み(関数を分けるのではなく、引数で処理したい)
			filterTasksAll() {
				this.$store.commit('localStorage/filterTasksAll');
			},
			filterTasks(state) {
				this.$store.commit('localStorage/filterTasks', state);
			},
		},
		computed: {
			filtered() {
				return this.$store.state.localStorage.filtered;
			}
		}
	}
</script>