import {
	init,
	h,
	propsModule,
	classModule,
	attributesModule,
	eventListenersModule
} from "snabbdom";
// 可使用 jsx 语法

import './style/index.css';

const patch = init([
	propsModule,
	classModule,
	attributesModule,
	eventListenersModule
]);

const container = document.getElementById("container");

const list = [{
		text: '读书',
		finish: false,
	},
	{
		text: '看报',
		finish: true,
	},
];

const patchEvent = () => {
	const newVnode = geneVnode();
	patch(vnode, newVnode);
	vnode = newVnode;
}


const change = (index) => {
	const pre = list[index].finish;
	list[index].finish = !pre;
	patchEvent();
}

const remove = (index) => {
	list.splice(index, 1);
	patchEvent();
}

const handleMap = {
	change,
	remove,
}

const add = (text) => {
	list.push({
		text,
		finish: false,
	});
	patchEvent();
}

let input = null;
const addItem = () => {
	if (!input) {
		input = document.getElementById('input');
	}
	const value = input.value;
	add(value);
	input.value = '';
}

const geneVnode = () => {
	const vlist = list.map((item, index) => {
		return h('div', {
				class: {
					finish: item.finish,
				},
				attrs: {
					'data-index': index,
				}
			},
			[
				h('span', {}, item.text),
				h('input', {
					props: {
						type: "checkbox",
					},
					attrs: {
						checked: item.finish,
						'data-action': 'change',
					}
				}),
				h('button', {
					attrs: {
						'data-action': 'remove',
					}
				}, '删除'),
			]
		);
	})
	console.log('list -> vnode', vlist);
	return h("div#container", {
		on: {
			click: click,
		}
	}, [
		h('div', {}, [
			h('input', {
				attrs: {
					id: 'input',
				}
			}),
			h('button', {
				on: {
					click: addItem
				}
			}, '添加')
		]),
		...vlist,
	]);
}

const click = (e) => {
	const action = e.target.dataset.action;
	if (!action) {
		return;
	}
	const index = e.target.parentElement.dataset.index;
	handleMap[action](index);
}

let vnode = geneVnode();

patch(container, vnode);