let activeEffect: Function;

// 副作用函数
export const effect = (fn: Function) => {
  const _effect = function () {
    activeEffect = _effect
    fn()
  }
  _effect()
}

// 收集依赖
const targetMap = new WeakMap()
export const track = <T extends object>(target:T, key: string | symbol):void => {
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if(!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
}

// 执行副作用函数 更新视图
export const trigger = <T extends object>(target:T, key: string | symbol):void => {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  deps.forEach((effect:Function) => effect());
}