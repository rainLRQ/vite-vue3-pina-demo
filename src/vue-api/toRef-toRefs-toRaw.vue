<template>
    
  <div>Q的like：{{ like }}</div><button @click="changeLike">换</button>
  <div>{{name}}--{{ age }} -- {{ like2 }}</div>
</template>

<script setup lang="ts">
  import { toRef, toRefs, toRaw, reactive} from "vue"

  // toRef 只能修改响应式对象的值， 非响应式视图毫无变化
  const man = reactive({name: 'Q', age: 23, like: 'dog'})
  let like = toRef(man, 'like') // 拷贝某一个响应式对象的某个属性的值作为响应式数据
  const changeLike = () => {
    // like.value = 'CAT'
    name.value = 'hh'
    console.log(like)
  }
  //  toRefs源码 将对象的所有值都转换成ref对象
  // const toRefs = <T extends object>(obj:T) => {
  //   const map:any = {}
  //   for(let key in obj) {
  //     map[key] = toRef(obj, key)
  //   }
  //   return map
  // }

  // let {name, age, like: like2} = man 
  // 响应式对象直接解构后的值会失去响应效果
  // 所以 需要用到 toRef或者toRefs将对象的属性转成响应式的再使用
  /**
   * 一个响应式对象，toRes(obj, 'key') 相当于 obj.get('key')， 前者拿返回的是响应式，但不会触发视图更新，后者返回的是普通数据
   */


  let {name, age, like: like2} = toRefs(man)
//  toRaw 将响应式Proxy对象转换为原始对象



</script>

