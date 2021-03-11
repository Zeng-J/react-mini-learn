const element = (
    <div id="foo">
        <a>bar</a>
        <b />
    </div>
)

const element = createElement(
    'div',
    { id: 'foo' },
    createElement('a', null, 'bar'),
    createElement('b')
)

const container = document.getElementById('root')
ReactDOM.render(element, container)

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === 'object'
                ? child
                : createTextElement(child)
            ),
        }
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        }
    }
}