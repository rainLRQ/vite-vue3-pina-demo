import {track, trigger} from './effect'

const isObject = (target:any) => typeof target !== null && typeof target === 'object'



export const reactive = <T extends object>(target: T):T => {

  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver) as object
      if(isObject(res)){
        return reactive(res)
      }
      track(target, key)
      return res 
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver) // 先赋值再执行trigger更新视图，最新的数据才会显示在视图上
      trigger(target, key)
      return res
    }
  })

}