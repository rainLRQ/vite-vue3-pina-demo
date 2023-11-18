<template>
  <div ref="box">ref: {{ man.name }} </div>
  <div >shallowRef: {{ man2.name }}</div>
  <div >myRef:{{ obj }}</div>

  <button @click="change">修改</button>
  <br>
  <button @click="changeObj">修改obj</button>

</template>

<script setup lang="ts">
  import { ref, isRef, shallowRef, triggerRef, customRef,reactive, isReactive, onMounted, nextTick} from "vue"
  // ref shallowRef
  // ref 深层次响应式  
  // shallowRef 浅层次 更改数据不会更新到视图上, 修改value的值才会响应在视图上
  // 
  // ref和shallowRef 的数据不能同时修改，ref会影响shallowRef修改后的值更新在视图上

  // ref的底层会调用triggerRef更新视图, 所以ref和shallowRef 会 强制更新数据修改的视图
  // shallowRef 的数据修改后也可以调用 triggerRef 强制更新视图

  // customRef 自定义ref === 也是浅层次的响应式
  function MyRef<T>(value:T) {
    let timer: any
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newVal) {
          timer && clearTimeout(timer)
          timer = setTimeout(() => {
            console.log('触发了')
            value = newVal
            trigger()
            timer = null
          }, 300)
          
        }
      }
    })
  }
  const box = ref<HTMLDivElement>() // 获取dom 变量名与 标签中 ref=""的值相同即可, 在dom挂载前注册，挂载后才可以使用
  onMounted(() => {
    nextTick(() => {
      console.log(box.value?.innerHTML, 'dom')
    })
  })
  const obj = MyRef<M>({name: 'object'})
  console.log('MyRef: ', obj)
  const changeObj = () => {
    obj.value = {name: 'obj2'}
  }  
  type M = {
    name: string
  }
  const man = ref({name: 'xiaoman'})
  const man2 = shallowRef({name: 'xiaoman2'})
  const change = () => {
    // man.value.name = 'daman'
    man2.value.name = 'daman2'
    triggerRef(man2)
    // man2.value = {name: 'daman3'}
    console.log(man2)
  }
</script>

<style scoped>

</style>
