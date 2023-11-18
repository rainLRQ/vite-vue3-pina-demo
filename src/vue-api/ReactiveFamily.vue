<template>
    <ul>
      <li v-for="li in list">{{ li }}</li>
    </ul>
    <button @click.prevent="add">添加</button>

</template>

<script setup lang="ts">
  import { ref, reactive, readonly, shallowReactive, ReactiveEffect} from "vue"
  // ref reactive
  // ref支持所有的数据类型 reactive只支持引用类型 array object map set weakmap weakset
  // ref 取值 赋值都要加.value    reactive不需要.value 正常读取值
  // reactive proxy 不能直接赋值，会破坏响应式
  // 解决方案 数组 使用 push 加解构， 或者把数组作为对象的属性， 对象单个修改属性值

  // shallowReactive 只会响应式对象的第一层数据，深层数据的修改不会触发试图更新
  // reactive 与 shallowReactive 的数据同时修改 也会 影响 shallowReactive 的数据， 更新到视图上
  
  let list = reactive<string[]>([])
  const read = readonly(list)
  // read.push('777') // 只读数据不可修改， 但是受到源数据的影响 
  console.log(read, 'readonly前') // []
  list.push('888')
  console.log(read, 'readonly后') // ['888']
  const add = () => {
    const res = ['shshs', 'dds', 'fff']
    list.push(...res)
  }

  // vue3源码运行流程 
  // 通过proxy代理返回响应式数据，使用weakMap 缓存每一个代理对象, 通过track收集追踪数据变化，通过trigger触发视图更新
  // 使用weakmap 收集依赖
  // WeakMap 的 key值 只能是引用类型的数据,并且weakMap的键名所指向的对象不计入垃圾回收机制
  // 它的键名索引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
  // 因此只要所引用的对象的其他引用被清除，垃圾回收机制就会释放该对象所占用的内存
  // 也就是说，一旦不再需要， WeakMap里面的键名所对应的键值对会自动消失，不用手动删除引用

</script>

<style scoped>

</style>
