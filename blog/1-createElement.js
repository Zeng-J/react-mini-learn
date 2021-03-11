
function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: [],
		}
	}
}

function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child =>
				typeof child === 'object'
					? child
					: createTextElement(child)
			)
		}
	}
}

const elementObj = createElement(
	'div',
	{
		id: 'foo'
	},
	createElement('b'),
	'bar'
)
console.log(JSON.stringify(elementObj));