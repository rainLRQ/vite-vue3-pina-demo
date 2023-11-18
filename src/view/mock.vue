<template>
<!--	<div>-->
		前端调取后端接口/n
		但是后端接口没有写好 先出接口文档
		\n
		前端可以模拟数据 mock 提升开发效率
		<br>
		mock 根据接口文档制造假数据，不耽误前端获取数据
		<br>
		~ json-server: mock-server 搭建工具 轻易搭建具有完整rest api的轻量级后端服务
<!--	</div>-->
	<ul>

		<li v-for="s in tableData" :key="s.id">{{s.name + s.age}}---------
			<AButton @click.prevent="deleteOne(s.id)" type="primary" danger ghost>删除</AButton>
			<AButton @click.prevent="patchOne(s.id)" type="primary" ghost>修改</AButton>

		</li>
	</ul>
	<AButton @click.prevent="addOne">添加</AButton>
	<AButton @click.prevent="selectOne">查询</AButton>
</template>

<script setup lang="ts">
import {Button as AButton} from 'ant-design-vue'
import {fetchList, deleteItem, patchItem, addItem} from "../request/mock"
import {ref} from 'vue'
let tableData = ref([])
const getData = async(params?: object) => {
	const res = await fetchList(params)
	tableData.value = res.data
}
getData()
const selectOne = async () => {
	await getData({id: 3})
}
const deleteOne = async(id:number) => {
	await deleteItem(id)
	await getData()
}
const addOne = async() => {
	await addItem({name: '珊珊', age: 20})
	await getData()
}
const patchOne = async(id: number) => {
	await patchItem(id, {name: '一一', age: 21})
	await getData()
}
</script>

<style lang="scss">
</style>
