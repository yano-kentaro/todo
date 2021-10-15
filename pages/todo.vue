<template>
	<v-row justify="center" align="center">

		<!-- タスク追加エリア -->
		<v-card class="py-4 d-flex justify-center" width="80%">
			<v-spacer />
			<v-text-field
				:rules="rules"
				counter="true"
				outlined
			></v-text-field>
			<v-btn
				color="primary"
				x-large
				style="margin-left: 10px;"
			>追加</v-btn>
			<v-spacer />
		</v-card>

		<!-- フィルターエリア -->
		<v-card class="py-4 d-flex justify-center" width="80%">
			<v-btn large style="margin: 0 20px;" width="15%" color="success">全て</v-btn>
			<v-btn large style="margin: 0 20px;" width="15%" color="primary">作業前</v-btn>
			<v-btn large style="margin: 0 20px;" width="15%" color="secondary">作業中</v-btn>
			<v-btn large style="margin: 0 20px;" width="15%" color="error">完了</v-btn>
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
				:items="tasks"
				:search="search"
				style="width: 80%;"
			>
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
					value: 'name',
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
					value: 'state',
				},
				{
					text: '削除',
					align: 'center',
					value: 'delete',
				},
			],
			tasks: [
				{
					name: '掃除',
					registDate: '2021-10-14 08:30:00',
					updateDate: '2021-10-14 08:45:00',
					state: '完了',
					delete: '',
				}
			],
			// 検索欄
			search: '',
		}),
		methods: {
			deleteTask(item) {
				this.tasks.splice(this);
			},
		},
	}
</script>