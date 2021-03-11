let nextUnitOfWork = null

function workLoop(deadline) {
  // 是否停止
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

    // 空闲时间小于1ms则停止
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function performUnitOfWork() {
  // ...
}