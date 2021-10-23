import { mount } from '@vue/test-utils'
import Todo from '@/pages/todo'

describe('Todo', ()  => {
	test('Todo Listという文字が表示されている', () => {
		const wrapper = mount(Todo);
		expect(wrapper.text()).toBe("Todo List");
	});
});