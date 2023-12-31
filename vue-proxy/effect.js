let activeEffect;
// 副作用函数
export const effect = (fn) => {
    const _effect = function () {
        activeEffect = _effect;
        fn();
    };
    _effect();
};
// 收集依赖
const targetMap = new WeakMap();
export const track = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    deps.add(activeEffect);
};
// 更新视图
export const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);
    deps.forEach(effect => effect());
};
