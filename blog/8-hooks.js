function Counter() {
  const [state, setState] = Didact.useState(1)
  return (
    <button onClick={() => setState(c => c + 1)}>
      Count: {state}
    </button>
  )
}


let wipFiber = null
let hookIndex = null

function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

function useState(inital) {
  const oldHook = 
    wipFiber.alternate && 
    wipFiber.alternate.hooks && 
    wipFiber.alternate.hooks[hookIndex]
  
  const hook = {
    state: oldHook ? oldHook.state : inital,
    queue: [],
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    const isFunction = action instanceof Function
    // 更新state
    hook.state = isFunction ? action(hook.state) : action
  })

  const setState = action => {
    hook.queue.push(action)
    // 像render函数一样，触发虚拟树构建并渲染
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  // fiber节点上存储hook状态
  wipFiber.hooks.push(hook)

  // hook位置向前一步
  hookIndex++
  return [hook.state, setState]
}