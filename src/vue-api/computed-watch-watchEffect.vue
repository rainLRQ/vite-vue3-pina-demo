<template>

  <table style="width: 100%;" border cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th>名称</th>
        <th>数量</th>
        <th>单价</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td align="center">{{ item.name}}</td>
        <td align="center">
          <button @click="addAndSub(item, false)">-</button>
          {{ item.num }}
          <button @click="addAndSub(item, true)">+</button>
        </td>
        <td align="center">{{ item.price}}</td>
        <td align="center"><button @click="deleteOne(index)">删除</button></td>
      </tr>
    </tbody>
    <tfoot>
       <td></td>
       <td></td>
       <td></td>
       <td align="center">总价：{{ amount }}</td>
    </tfoot>
  </table>
  <br>
  <input type="text" v-model="m1.foo.bar.name">
  <br>
  <input type="text" v-model="m2.book.price">

  <!-- watchEffect -->
  <br>
  <br>
  <div>watchEffect</div>
  <input type="text" v-model="message">
  <input type="text" v-model="message2">
  <button @click="stopWatch" id="ç">停止监听</button>
</template>

<script setup lang="ts">
import {computed, watch, watchEffect, ref, reactive} from 'vue'
// computed  购物车案例
type Shop = {
  name: string,
  num: number,
  price: number
}

const data = reactive<Shop[]>([
  {name: 'ooo', num: 1, price: 200},
  {name: 'bbb', num: 1, price: 300},
  {name: 'ccc', num: 1, price: 100},
  {name: 'ggg', num: 1, price: 100}
])

const addAndSub = (item: Shop, type: boolean):void => {
  if(item.num > 1 && !type) {
    item.num--
  }
  if(item.num < 99 && type) {
    item.num++
  }
}
const deleteOne = (index: number):void => {
  data.splice(index, 1)
}
const amount = computed<number>(() => {
  return data.reduce((pre, item) => {
    return pre + item.num * item.price
  }, 0)
})


//  ref后的对象要想深度监听需要第三个监听参数选项{deep: true}
// reactive 的对象深度监听不需要{deep:true}, 源码里默认已经开启了深度监听
let m1 = ref({
  foo: {
    bar: {
      name: '小满'
    }
  }
})
let m2 = reactive({
  book: {
    price: '18'
  }
})

// 监听响应式数据 新值和旧值一样的原因 : 源码中在监听到新旧数据的变化，最后会把newVal 赋值给 oldVal， 由于引用数据类型赋值的是地址，所以打印后数据是一样的
watch(m1, (newVal, oldVal) => {
  console.log(newVal.foo.bar.name, oldVal.foo.bar.name)
}, {
  // immediate: true, // 组件挂载时立即执行一次
  deep: true, // 深度监听
  flush: 'pre', // pre 组件更新之前调用  sync 同步执行 post: 组件更新之后执行，
  onTrack: () => {},
  onTrigger: () => {}
})

watch(m2, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

// 监听对象的某一个属性值  m2.book.price
watch(() => m2.book.price, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

// type Flush = 'pre' | 'sync' | 'post'
// const flush:Flush = 'pre'

// watch  源码 watch 函数接受三个参数
// 1. source 监听的数据源
// 2.回调函数 any类型
// 3.可选参数 options
// options:
// immediate： 立即执行一次，这个时候oldVal 为undefined
// deep: 深度监听
// flush: 有三个值 // pre 组件更新之前调用  sync 同步执行 post: 组件更新之后执行，
// onTrack:
// onTrigger:

// 把参数传递给doWatch函数
// 格式化 source 判断 Ref Reactive，isArray, 普通对象数据, Reactive默认开启deep深度监听

// watchEffect 立即执行传入的一个函数，同时响应式追踪依赖，并在依赖变更时重新运行函数
// 函数中 用到几个数据就监听几个，而且是非惰性，会默认调用一次

let message = ref<string>('123')
let message2 = ref<string>('456')
const stop = watchEffect((oninvalidate) => {
  // let btn: HTMLButtonElement = document.getElementById('btn') as HTMLButtonElement
  // console.log(btn, 'e11111111111')
  console.log('message', message.value)
  console.log('message2', message2.value)
  oninvalidate(() => {
    // 清除副作用的回调函数, 在自定义代码前执行
    console.log('before')
  })
}, {
  flush: 'post',
  onTrack(e){
    // e.type : get  收集依赖追踪触发
    console.log(e, 'eeeee')
    debugger
  },
  onTrigger(e) {
    // e.type : set 修改数据触发
    //  开发环境调试用函数
    console.log(e, 'e')
    debugger
  }
})
const stopWatch = () => stop()

// 清除副作用 就是在触发监听之前会调用一个函数可以处理你的逻辑例如防抖
</script>

