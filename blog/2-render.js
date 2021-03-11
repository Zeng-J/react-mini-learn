function render(element, container) {
  const dom =
    element.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  // element.props上的属性除了children，都属于dom节点属性
  const isProperty = key => key !== 'children'

  // 给dom添加属性
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  // 递归遍历dom里面的子元素
  element.props.children.forEach(child =>
    render(child, dom)
  )

  container.appendChild(dom)
}

const ReactDOM = {
  render
}